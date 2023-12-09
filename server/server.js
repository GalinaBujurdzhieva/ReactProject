(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory(
        require("http"),
        require("fs"),
        require("crypto")
      ))
    : typeof define === "function" && define.amd
    ? define(["http", "fs", "crypto"], factory)
    : ((global =
        typeof globalThis !== "undefined" ? globalThis : global || self),
      (global.Server = factory(global.http, global.fs, global.crypto)));
})(this, function (http, fs, crypto) {
  "use strict";

  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : { default: e };
  }

  var http__default = /*#__PURE__*/ _interopDefaultLegacy(http);
  var fs__default = /*#__PURE__*/ _interopDefaultLegacy(fs);
  var crypto__default = /*#__PURE__*/ _interopDefaultLegacy(crypto);

  class ServiceError extends Error {
    constructor(message = "Service Error") {
      super(message);
      this.name = "ServiceError";
    }
  }

  class NotFoundError extends ServiceError {
    constructor(message = "Resource not found") {
      super(message);
      this.name = "NotFoundError";
      this.status = 404;
    }
  }

  class RequestError extends ServiceError {
    constructor(message = "Request error") {
      super(message);
      this.name = "RequestError";
      this.status = 400;
    }
  }

  class ConflictError extends ServiceError {
    constructor(message = "Resource conflict") {
      super(message);
      this.name = "ConflictError";
      this.status = 409;
    }
  }

  class AuthorizationError extends ServiceError {
    constructor(message = "Unauthorized") {
      super(message);
      this.name = "AuthorizationError";
      this.status = 401;
    }
  }

  class CredentialError extends ServiceError {
    constructor(message = "Forbidden") {
      super(message);
      this.name = "CredentialError";
      this.status = 403;
    }
  }

  var errors = {
    ServiceError,
    NotFoundError,
    RequestError,
    ConflictError,
    AuthorizationError,
    CredentialError,
  };

  const { ServiceError: ServiceError$1 } = errors;

  function createHandler(plugins, services) {
    return async function handler(req, res) {
      const method = req.method;
      console.info(`<< ${req.method} ${req.url}`);

      // Redirect fix for admin panel relative paths
      if (req.url.slice(-6) == "/admin") {
        res.writeHead(302, {
          Location: `http://${req.headers.host}/admin/`,
        });
        return res.end();
      }

      let status = 200;
      let headers = {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      };
      let result = "";
      let context;

      // NOTE: the OPTIONS method results in undefined result and also it never processes plugins - keep this in mind
      if (method == "OPTIONS") {
        Object.assign(headers, {
          "Access-Control-Allow-Methods":
            "GET, POST, PUT, DELETE, OPTIONS, PATCH",
          "Access-Control-Allow-Credentials": false,
          "Access-Control-Max-Age": "86400",
          "Access-Control-Allow-Headers":
            "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-Authorization, X-Admin",
        });
      } else {
        try {
          context = processPlugins();
          await handle(context);
        } catch (err) {
          if (err instanceof ServiceError$1) {
            status = err.status || 400;
            result = composeErrorObject(err.code || status, err.message);
          } else {
            // Unhandled exception, this is due to an error in the service code - REST consumers should never have to encounter this;
            // If it happens, it must be debugged in a future version of the server
            console.error(err);
            status = 500;
            result = composeErrorObject(500, "Server Error");
          }
        }
      }

      res.writeHead(status, headers);
      if (
        context != undefined &&
        context.util != undefined &&
        context.util.throttle
      ) {
        await new Promise((r) => setTimeout(r, 500 + Math.random() * 500));
      }
      res.end(result);

      function processPlugins() {
        const context = { params: {} };
        plugins.forEach((decorate) => decorate(context, req));
        return context;
      }

      async function handle(context) {
        const { serviceName, tokens, query, body } = await parseRequest(req);
        if (serviceName == "admin") {
          return ({ headers, result } = services["admin"](
            method,
            tokens,
            query,
            body
          ));
        } else if (serviceName == "favicon.ico") {
          return ({ headers, result } = services["favicon"](
            method,
            tokens,
            query,
            body
          ));
        }

        const service = services[serviceName];

        if (service === undefined) {
          status = 400;
          result = composeErrorObject(
            400,
            `Service "${serviceName}" is not supported`
          );
          console.error("Missing service " + serviceName);
        } else {
          result = await service(context, { method, tokens, query, body });
        }

        // NOTE: logout does not return a result
        // in this case the content type header should be omitted, to allow checks on the client
        if (result !== undefined) {
          result = JSON.stringify(result);
        } else {
          status = 204;
          delete headers["Content-Type"];
        }
      }
    };
  }

  function composeErrorObject(code, message) {
    return JSON.stringify({
      code,
      message,
    });
  }

  async function parseRequest(req) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const tokens = url.pathname.split("/").filter((x) => x.length > 0);
    const serviceName = tokens.shift();
    const queryString = url.search.split("?")[1] || "";
    const query = queryString
      .split("&")
      .filter((s) => s != "")
      .map((x) => x.split("="))
      .reduce(
        (p, [k, v]) => Object.assign(p, { [k]: decodeURIComponent(v) }),
        {}
      );
    const body = await parseBody(req);

    return {
      serviceName,
      tokens,
      query,
      body,
    };
  }

  function parseBody(req) {
    return new Promise((resolve, reject) => {
      let body = "";
      req.on("data", (chunk) => (body += chunk.toString()));
      req.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (err) {
          resolve(body);
        }
      });
    });
  }

  var requestHandler = createHandler;

  class Service {
    constructor() {
      this._actions = [];
      this.parseRequest = this.parseRequest.bind(this);
    }

    /**
     * Handle service request, after it has been processed by a request handler
     * @param {*} context Execution context, contains result of middleware processing
     * @param {{method: string, tokens: string[], query: *, body: *}} request Request parameters
     */
    async parseRequest(context, request) {
      for (let { method, name, handler } of this._actions) {
        if (
          method === request.method &&
          matchAndAssignParams(context, request.tokens[0], name)
        ) {
          return await handler(
            context,
            request.tokens.slice(1),
            request.query,
            request.body
          );
        }
      }
    }

    /**
     * Register service action
     * @param {string} method HTTP method
     * @param {string} name Action name. Can be a glob pattern.
     * @param {(context, tokens: string[], query: *, body: *)} handler Request handler
     */
    registerAction(method, name, handler) {
      this._actions.push({ method, name, handler });
    }

    /**
     * Register GET action
     * @param {string} name Action name. Can be a glob pattern.
     * @param {(context, tokens: string[], query: *, body: *)} handler Request handler
     */
    get(name, handler) {
      this.registerAction("GET", name, handler);
    }

    /**
     * Register POST action
     * @param {string} name Action name. Can be a glob pattern.
     * @param {(context, tokens: string[], query: *, body: *)} handler Request handler
     */
    post(name, handler) {
      this.registerAction("POST", name, handler);
    }

    /**
     * Register PUT action
     * @param {string} name Action name. Can be a glob pattern.
     * @param {(context, tokens: string[], query: *, body: *)} handler Request handler
     */
    put(name, handler) {
      this.registerAction("PUT", name, handler);
    }

    /**
     * Register PATCH action
     * @param {string} name Action name. Can be a glob pattern.
     * @param {(context, tokens: string[], query: *, body: *)} handler Request handler
     */
    patch(name, handler) {
      this.registerAction("PATCH", name, handler);
    }

    /**
     * Register DELETE action
     * @param {string} name Action name. Can be a glob pattern.
     * @param {(context, tokens: string[], query: *, body: *)} handler Request handler
     */
    delete(name, handler) {
      this.registerAction("DELETE", name, handler);
    }
  }

  function matchAndAssignParams(context, name, pattern) {
    if (pattern == "*") {
      return true;
    } else if (pattern[0] == ":") {
      context.params[pattern.slice(1)] = name;
      return true;
    } else if (name == pattern) {
      return true;
    } else {
      return false;
    }
  }

  var Service_1 = Service;

  function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        let r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  var util = {
    uuid,
  };

  const uuid$1 = util.uuid;

  const data = fs__default["default"].existsSync("./data")
    ? fs__default["default"].readdirSync("./data").reduce((p, c) => {
        const content = JSON.parse(
          fs__default["default"].readFileSync("./data/" + c)
        );
        const collection = c.slice(0, -5);
        p[collection] = {};
        for (let endpoint in content) {
          p[collection][endpoint] = content[endpoint];
        }
        return p;
      }, {})
    : {};

  const actions = {
    get: (context, tokens, query, body) => {
      tokens = [context.params.collection, ...tokens];
      let responseData = data;
      for (let token of tokens) {
        if (responseData !== undefined) {
          responseData = responseData[token];
        }
      }
      return responseData;
    },
    post: (context, tokens, query, body) => {
      tokens = [context.params.collection, ...tokens];
      console.log("Request body:\n", body);

      // TODO handle collisions, replacement
      let responseData = data;
      for (let token of tokens) {
        if (responseData.hasOwnProperty(token) == false) {
          responseData[token] = {};
        }
        responseData = responseData[token];
      }

      const newId = uuid$1();
      responseData[newId] = Object.assign({}, body, { _id: newId });
      return responseData[newId];
    },
    put: (context, tokens, query, body) => {
      tokens = [context.params.collection, ...tokens];
      console.log("Request body:\n", body);

      let responseData = data;
      for (let token of tokens.slice(0, -1)) {
        if (responseData !== undefined) {
          responseData = responseData[token];
        }
      }
      if (
        responseData !== undefined &&
        responseData[tokens.slice(-1)] !== undefined
      ) {
        responseData[tokens.slice(-1)] = body;
      }
      return responseData[tokens.slice(-1)];
    },
    patch: (context, tokens, query, body) => {
      tokens = [context.params.collection, ...tokens];
      console.log("Request body:\n", body);

      let responseData = data;
      for (let token of tokens) {
        if (responseData !== undefined) {
          responseData = responseData[token];
        }
      }
      if (responseData !== undefined) {
        Object.assign(responseData, body);
      }
      return responseData;
    },
    delete: (context, tokens, query, body) => {
      tokens = [context.params.collection, ...tokens];
      let responseData = data;

      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (responseData.hasOwnProperty(token) == false) {
          return null;
        }
        if (i == tokens.length - 1) {
          const body = responseData[token];
          delete responseData[token];
          return body;
        } else {
          responseData = responseData[token];
        }
      }
    },
  };

  const dataService = new Service_1();
  dataService.get(":collection", actions.get);
  dataService.post(":collection", actions.post);
  dataService.put(":collection", actions.put);
  dataService.patch(":collection", actions.patch);
  dataService.delete(":collection", actions.delete);

  var jsonstore = dataService.parseRequest;

  /*
   * This service requires storage and auth plugins
   */

  const { AuthorizationError: AuthorizationError$1 } = errors;

  const userService = new Service_1();

  userService.get("me", getSelf);
  userService.post("register", onRegister);
  userService.post("login", onLogin);
  userService.get("logout", onLogout);

  function getSelf(context, tokens, query, body) {
    if (context.user) {
      const result = Object.assign({}, context.user);
      delete result.hashedPassword;
      return result;
    } else {
      throw new AuthorizationError$1();
    }
  }

  function onRegister(context, tokens, query, body) {
    return context.auth.register(body);
  }

  function onLogin(context, tokens, query, body) {
    return context.auth.login(body);
  }

  function onLogout(context, tokens, query, body) {
    return context.auth.logout();
  }

  var users = userService.parseRequest;

  const { NotFoundError: NotFoundError$1, RequestError: RequestError$1 } =
    errors;

  var crud = {
    get,
    post,
    put,
    patch,
    delete: del,
  };

  function validateRequest(context, tokens, query) {
    /*
        if (context.params.collection == undefined) {
            throw new RequestError('Please, specify collection name');
        }
        */
    if (tokens.length > 1) {
      throw new RequestError$1();
    }
  }

  function parseWhere(query) {
    const operators = {
      "<=": (prop, value) => (record) => record[prop] <= JSON.parse(value),
      "<": (prop, value) => (record) => record[prop] < JSON.parse(value),
      ">=": (prop, value) => (record) => record[prop] >= JSON.parse(value),
      ">": (prop, value) => (record) => record[prop] > JSON.parse(value),
      "=": (prop, value) => (record) => record[prop] == JSON.parse(value),
      " like ": (prop, value) => (record) =>
        record[prop].toLowerCase().includes(JSON.parse(value).toLowerCase()),
      " in ": (prop, value) => (record) =>
        JSON.parse(`[${/\((.+?)\)/.exec(value)[1]}]`).includes(record[prop]),
    };
    const pattern = new RegExp(
      `^(.+?)(${Object.keys(operators).join("|")})(.+?)$`,
      "i"
    );

    try {
      let clauses = [query.trim()];
      let check = (a, b) => b;
      let acc = true;
      if (query.match(/ and /gi)) {
        // inclusive
        clauses = query.split(/ and /gi);
        check = (a, b) => a && b;
        acc = true;
      } else if (query.match(/ or /gi)) {
        // optional
        clauses = query.split(/ or /gi);
        check = (a, b) => a || b;
        acc = false;
      }
      clauses = clauses.map(createChecker);

      return (record) => clauses.map((c) => c(record)).reduce(check, acc);
    } catch (err) {
      throw new Error("Could not parse WHERE clause, check your syntax.");
    }

    function createChecker(clause) {
      let [match, prop, operator, value] = pattern.exec(clause);
      [prop, value] = [prop.trim(), value.trim()];

      return operators[operator.toLowerCase()](prop, value);
    }
  }

  function get(context, tokens, query, body) {
    validateRequest(context, tokens);

    let responseData;

    try {
      console.log(query.where);
      if (query.where) {
        responseData = context.storage
          .get(context.params.collection)
          .filter(parseWhere(query.where));
      } else if (context.params.collection) {
        responseData = context.storage.get(
          context.params.collection,
          tokens[0]
        );
      } else {
        // Get list of collections
        return context.storage.get();
      }

      if (query.sortBy) {
        const props = query.sortBy
          .split(",")
          .filter((p) => p != "")
          .map((p) => p.split(" ").filter((p) => p != ""))
          .map(([p, desc]) => ({ prop: p, desc: desc ? true : false }));

        // Sorting priority is from first to last, therefore we sort from last to first
        for (let i = props.length - 1; i >= 0; i--) {
          let { prop, desc } = props[i];
          responseData.sort(({ [prop]: propA }, { [prop]: propB }) => {
            if (typeof propA == "number" && typeof propB == "number") {
              return (propA - propB) * (desc ? -1 : 1);
            } else {
              return propA.localeCompare(propB) * (desc ? -1 : 1);
            }
          });
        }
      }

      if (query.offset) {
        responseData = responseData.slice(Number(query.offset) || 0);
      }
      const pageSize = Number(query.pageSize) || 10;
      if (query.pageSize) {
        responseData = responseData.slice(0, pageSize);
      }

      if (query.distinct) {
        const props = query.distinct.split(",").filter((p) => p != "");
        responseData = Object.values(
          responseData.reduce((distinct, c) => {
            const key = props.map((p) => c[p]).join("::");
            if (distinct.hasOwnProperty(key) == false) {
              distinct[key] = c;
            }
            return distinct;
          }, {})
        );
      }

      if (query.count) {
        return responseData.length;
      }

      if (query.select) {
        const props = query.select.split(",").filter((p) => p != "");
        responseData = Array.isArray(responseData)
          ? responseData.map(transform)
          : transform(responseData);

        function transform(r) {
          const result = {};
          props.forEach((p) => (result[p] = r[p]));
          return result;
        }
      }

      if (query.load) {
        const props = query.load.split(",").filter((p) => p != "");
        props.map((prop) => {
          const [propName, relationTokens] = prop.split("=");
          const [idSource, collection] = relationTokens.split(":");
          console.log(
            `Loading related records from "${collection}" into "${propName}", joined on "_id"="${idSource}"`
          );
          const storageSource =
            collection == "users" ? context.protectedStorage : context.storage;
          responseData = Array.isArray(responseData)
            ? responseData.map(transform)
            : transform(responseData);

          function transform(r) {
            const seekId = r[idSource];
            const related = storageSource.get(collection, seekId);
            delete related.hashedPassword;
            r[propName] = related;
            return r;
          }
        });
      }
    } catch (err) {
      console.error(err);
      if (err.message.includes("does not exist")) {
        throw new NotFoundError$1();
      } else {
        throw new RequestError$1(err.message);
      }
    }

    context.canAccess(responseData);

    return responseData;
  }

  function post(context, tokens, query, body) {
    console.log("Request body:\n", body);

    validateRequest(context, tokens);
    if (tokens.length > 0) {
      throw new RequestError$1("Use PUT to update records");
    }
    context.canAccess(undefined, body);

    body._ownerId = context.user._id;
    let responseData;

    try {
      responseData = context.storage.add(context.params.collection, body);
    } catch (err) {
      throw new RequestError$1();
    }

    return responseData;
  }

  function put(context, tokens, query, body) {
    console.log("Request body:\n", body);

    validateRequest(context, tokens);
    if (tokens.length != 1) {
      throw new RequestError$1("Missing entry ID");
    }

    let responseData;
    let existing;

    try {
      existing = context.storage.get(context.params.collection, tokens[0]);
    } catch (err) {
      throw new NotFoundError$1();
    }

    context.canAccess(existing, body);

    try {
      responseData = context.storage.set(
        context.params.collection,
        tokens[0],
        body
      );
    } catch (err) {
      throw new RequestError$1();
    }

    return responseData;
  }

  function patch(context, tokens, query, body) {
    console.log("Request body:\n", body);

    validateRequest(context, tokens);
    if (tokens.length != 1) {
      throw new RequestError$1("Missing entry ID");
    }

    let responseData;
    let existing;

    try {
      existing = context.storage.get(context.params.collection, tokens[0]);
    } catch (err) {
      throw new NotFoundError$1();
    }

    context.canAccess(existing, body);

    try {
      responseData = context.storage.merge(
        context.params.collection,
        tokens[0],
        body
      );
    } catch (err) {
      throw new RequestError$1();
    }

    return responseData;
  }

  function del(context, tokens, query, body) {
    validateRequest(context, tokens);
    if (tokens.length != 1) {
      throw new RequestError$1("Missing entry ID");
    }

    let responseData;
    let existing;

    try {
      existing = context.storage.get(context.params.collection, tokens[0]);
    } catch (err) {
      throw new NotFoundError$1();
    }

    context.canAccess(existing);

    try {
      responseData = context.storage.delete(
        context.params.collection,
        tokens[0]
      );
    } catch (err) {
      throw new RequestError$1();
    }

    return responseData;
  }

  /*
   * This service requires storage and auth plugins
   */

  const dataService$1 = new Service_1();
  dataService$1.get(":collection", crud.get);
  dataService$1.post(":collection", crud.post);
  dataService$1.put(":collection", crud.put);
  dataService$1.patch(":collection", crud.patch);
  dataService$1.delete(":collection", crud.delete);

  var data$1 = dataService$1.parseRequest;

  const imgdata =
    "iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAPNnpUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHja7ZpZdiS7DUT/uQovgSQ4LofjOd6Bl+8LZqpULbWm7vdnqyRVKQeCBAKBAFNm/eff2/yLr2hzMSHmkmpKlq9QQ/WND8VeX+38djac3+cr3af4+5fj5nHCc0h4l+vP8nJicdxzeN7Hxz1O43h8Gmi0+0T/9cT09/jlNuAeBs+XuMuAvQ2YeQ8k/jrhwj2Re3mplvy8hH3PKPr7SLl+jP6KkmL2OeErPnmbQ9q8Rmb0c2ynxafzO+eET7mC65JPjrM95exN2jmmlYLnophSTKLDZH+GGAwWM0cyt3C8nsHWWeG4Z/Tio7cHQiZ2M7JK8X6JE3t++2v5oj9O2nlvfApc50SkGQ5FDnm5B2PezJ8Bw1PUPvl6cYv5G788u8V82y/lPTgfn4CC+e2JN+Ds5T4ubzCVHu8M9JsTLr65QR5m/LPhvh6G/S8zcs75XzxZXn/2nmXvda2uhURs051x51bzMgwXdmIl57bEK/MT+ZzPq/IqJPEA+dMO23kNV50HH9sFN41rbrvlJu/DDeaoMci8ez+AjB4rkn31QxQxQV9u+yxVphRgM8CZSDDiH3Nxx2499oYrWJ6OS71jMCD5+ct8dcF3XptMNupie4XXXQH26nCmoZHT31xGQNy+4xaPg19ejy/zFFghgvG4ubDAZvs1RI/uFVtyACBcF3m/0sjlqVHzByUB25HJOCEENjmJLjkL2LNzQXwhQI2Ze7K0EwEXo59M0geRRGwKOMI292R3rvXRX8fhbuJDRkomNlUawQohgp8cChhqUWKIMZKxscQamyEBScaU0knM1E6WxUxO5pJrbkVKKLGkkksptbTqq1AjYiWLa6m1tobNFkyLjbsbV7TWfZceeuyp51567W0AnxFG1EweZdTRpp8yIayZZp5l1tmWI6fFrLDiSiuvsupqG6xt2WFHOCXvsutuj6jdUX33+kHU3B01fyKl1+VH1Diasw50hnDKM1FjRsR8cEQ8awQAtNeY2eJC8Bo5jZmtnqyInklGjc10thmXCGFYzsftHrF7jdy342bw9Vdx89+JnNHQ/QOR82bJm7j9JmqnGo8TsSsL1adWyD7Or9J8aTjbXx/+9v3/A/1vDUS9tHOXtLaM6JoBquRHJFHdaNU5oF9rKVSjYNewoFNsW032cqqCCx/yljA2cOy7+7zJ0biaicv1TcrWXSDXVT3SpkldUqqPIJj8p9oeWVs4upKL3ZHgpNzYnTRv5EeTYXpahYRgfC+L/FyxBphCmPLK3W1Zu1QZljTMJe5AIqmOyl0qlaFCCJbaPAIMWXzurWAMXiB1fGDtc+ld0ZU12k5cQq4v7+AB2x3qLlQ3hyU/uWdzzgUTKfXSputZRtp97hZ3z4EE36WE7WtjbqMtMr912oRp47HloZDlywxJ+uyzmrW91OivysrM1Mt1rZbrrmXm2jZrYWVuF9xZVB22jM4ccdaE0kh5jIrnzBy5w6U92yZzS1wrEao2ZPnE0tL0eRIpW1dOWuZ1WlLTqm7IdCESsV5RxjQ1/KWC/y/fPxoINmQZI8Cli9oOU+MJYgrv006VQbRGC2Ug8TYzrdtUHNjnfVc6/oN8r7tywa81XHdZN1QBUhfgzRLzmPCxu1G4sjlRvmF4R/mCYdUoF2BYNMq4AjD2GkMGhEt7PAJfKrH1kHmj8eukyLb1oCGW/WdAtx0cURYqtcGnNlAqods6UnaRpY3LY8GFbPeSrjKmsvhKnWTtdYKhRW3TImUqObdpGZgv3ltrdPwwtD+l1FD/htxAwjdUzhtIkWNVy+wBUmDtphwgVemd8jV1miFXWTpumqiqvnNuArCrFMbLPexJYpABbamrLiztZEIeYPasgVbnz9/NZxe4p/B+FV3zGt79B9S0Jc0Lu+YH4FXsAsa2YnRIAb2thQmGc17WdNd9cx4+y4P89EiVRKB+CvRkiPTwM7Ts+aZ5aV0C4zGoqyOGJv3yGMJaHXajKbOGkm40Ychlkw6c6hZ4s+SDJpsmncwmm8ChEmBWspX8MkFB+kzF1ZlgoGWiwzY6w4AIPDOcJxV3rtUnabEgoNBB4MbNm8GlluVIpsboaKl0YR8kGnXZH3JQZrH2MDxxRrHFUduh+CvQszakraM9XNo7rEVjt8VpbSOnSyD5dwLfVI4+Sl+DCZc5zU6zhrXnRhZqUowkruyZupZEm/dA2uVTroDg1nfdJMBua9yCJ8QPtGw2rkzlYLik5SBzUGSoOqBMJvwTe92eGgOVx8/T39TP0r/PYgfkP1IEyGVhYHXyJiVPU0skB3dGqle6OZuwj/Hw5c2gV5nEM6TYaAryq3CRXsj1088XNwt0qcliqNc6bfW+TttRydKpeJOUWTmmUiwJKzpr6hkVzzLrVs+s66xEiCwOzfg5IRgwQgFgrriRlg6WQS/nGyRUNDjulWsUbO8qu/lWaWeFe8QTs0puzrxXH1H0b91KgDm2dkdrpkpx8Ks2zZu4K1GHPpDxPdCL0RH0SZZrGX8hRKTA+oUPzQ+I0K1C16ZSK6TR28HUdlnfpzMsIvd4TR7iuSe/+pn8vief46IQULRGcHvRVUyn9aYeoHbGhEbct+vEuzIxhxJrgk1oyo3AFA7eSSSNI/Vxl0eLMCrJ/j1QH0ybj0C9VCn9BtXbz6Kd10b8QKtpTnecbnKHWZxcK2OiKCuViBHqrzM2T1uFlGJlMKFKRF1Zy6wMqQYtgKYc4PFoGv2dX2ixqGaoFDhjzRmp4fsygFZr3t0GmBqeqbcBFpvsMVCNajVWcLRaPBhRKc4RCCUGZphKJdisKdRjDKdaNbZfwM5BulzzCvyv0AsAlu8HOAdIXAuMAg0mWa0+0vgrODoHlm7Y7rXUHmm9r2RTLpXwOfOaT6iZdASpqOIXfiABLwQkrSPFXQgAMHjYyEVrOBESVgS4g4AxcXyiPwBiCF6g2XTPk0hqn4D67rbQVFv0Lam6Vfmvq90B3WgV+peoNRb702/tesrImcBCvIEaGoI/8YpKa1XmDNr1aGUwjDETBa3VkOLYVLGKeWQcd+WaUlsMdTdUg3TcUPvdT20ftDW4+injyAarDRVVRgc906sNTo1cu7LkDGewjkQ35Z7l4Htnx9MCkbenKiNMsif+5BNVnA6op3gZVZtjIAacNia+00w1ZutIibTMOJ7IISctvEQGDxEYDUSxUiH4R4kkH86dMywCqVJ2XpzkUYUgW3mDPmz0HLW6w9daRn7abZmo4QR5i/A21r4oEvCC31oajm5CR1yBZcIfN7rmgxM9qZBhXh3C6NR9dCS1PTMJ30c4fEcwkq0IXdphpB9eg4x1zycsof4t6C4jyS68eW7OonpSEYCzb5dWjQH3H5fWq2SH41O4LahPrSJA77KqpJYwH6pdxDfDIgxLR9GptCKMoiHETrJ0wFSR3Sk7yI97KdBVSHXeS5FBnYKIz1JU6VhdCkfHIP42o0V6aqgg00JtZfdK6hPeojtXvgfnE/VX0p0+fqxp2/nDfvBuHgeo7ppkrr/MyU1dT73n5B/qi76+lzMnVnHRJDeZOyj3XXdQrrtOUPQunDqgDlz+iuS3QDafITkJd050L0Hi2kiRBX52pIVso0ZpW1YQsT2VRgtxm9iiqU2qXyZ0OdvZy0J1gFotZFEuGrnt3iiiXvECX+UcWBqpPlgLRkdN7cpl8PxDjWseAu1bPdCjBSrQeVD2RHE7bRhMb1Qd3VHVXVNBewZ3Wm7avbifhB+4LNQrmp0WxiCNkm7dd7mV39SnokrvfzIr+oDSFq1D76MZchw6Vl4Z67CL01I6ZiX/VEqfM1azjaSkKqC+kx67tqTg5ntLii5b96TAA3wMTx2NvqsyyUajYQHJ1qkpmzHQITXDUZRGTYtNw9uLSndMmI9tfMdEeRgwWHB7NlosyivZPlvT5KIOc+GefU9UhA4MmKFXmhAuJRFVWHRJySbREImpQysz4g3uJckihD7P84nWtLo7oR4tr8IKdSBXYvYaZnm3ffhh9nyWPDa+zQfzdULsFlr/khrMb7hhAroOKSZgxbUzqdiVIhQc+iZaTbpesLXSbIfbjwXTf8AjbnV6kTpD4ZsMdXMK45G1NRiMdh/bLb6oXX+4rWHen9BW+xJDV1N+i6HTlKdLDMnVkx8tdHryus3VlCOXXKlDIiuOkimXnmzmrtbGqmAHL1TVXU73PX5nx3xhSO3QKtBqbd31iQHHBNXXrYIXHVyQqDGIcc6qHEcz2ieN+radKS9br/cGzC0G7g0YFQPGdqs7MI6pOt2BgYtt/4MNW8NJ3VT5es/izZZFd9yIfwY1lUubGSSnPiWWzDpAN+sExNptEoBx74q8bAzdFu6NocvC2RgK2WR7doZodiZ6OgoUrBoWIBM2xtMHXUX3GGktr5RtwPZ9tTWfleFP3iEc2hTar6IC1Y55ktYKQtXTsKkfgQ+al0aXBCh2dlCxdBtLtc8QJ4WUKIX+jlRR/TN9pXpNA1bUC7LaYUzJvxr6rh2Q7ellILBd0PcFF5F6uArA6ODZdjQYosZpf7lbu5kNFfbGUUY5C2p7esLhhjw94Miqk+8tDPgTVXX23iliu782KzsaVdexRSq4NORtmY3erV/NFsJU9S7naPXmPGLYvuy5USQA2pcb4z/fYafpPj0t5HEeD1y7W/Z+PHA2t8L1eGCCeFS/Ph04Hafu+Uf8ly2tjUNDQnNUIOqVLrBLIwxK67p3fP7LaX/LjnlniCYv6jNK0ce5YrPud1Gc6LQWg+sumIt2hCCVG3e8e5tsLAL2qWekqp1nKPKqKIJcmxO3oljxVa1TXVDVWmxQ/lhHHnYNP9UDrtFdwekRKCueDRSRAYoo0nEssbG3znTTDahVUXyDj+afeEhn3w/UyY0fSv5b8ZuSmaDVrURYmBrf0ZgIMOGuGFNG3FH45iA7VFzUnj/odcwHzY72OnQEhByP3PtKWxh/Q+/hkl9x5lEic5ojDGgEzcSpnJEwY2y6ZN0RiyMBhZQ35AigLvK/dt9fn9ZJXaHUpf9Y4IxtBSkanMxxP6xb/pC/I1D1icMLDcmjZlj9L61LoIyLxKGRjUcUtOiFju4YqimZ3K0odbd1Usaa7gPp/77IJRuOmxAmqhrWXAPOftoY0P/BsgifTmC2ChOlRSbIMBjjm3bQIeahGwQamM9wHqy19zaTCZr/AtjdNfWMu8SZAAAA13pUWHRSYXcgcHJvZmlsZSB0eXBlIGlwdGMAAHjaPU9LjkMhDNtzijlCyMd5HKflgdRdF72/xmFGJSIEx9ihvd6f2X5qdWizy9WH3+KM7xrRp2iw6hLARIfnSKsqoRKGSEXA0YuZVxOx+QcnMMBKJR2bMdNUDraxWJ2ciQuDDPKgNDA8kakNOwMLriTRO2Alk3okJsUiidC9Ex9HbNUMWJz28uQIzhhNxQduKhdkujHiSJVTCt133eqpJX/6MDXh7nrXydzNq9tssr14NXuwFXaoh/CPiLRfLvxMyj3GtTgAAAGFaUNDUElDQyBwcm9maWxlAAB4nH2RPUjDQBzFX1NFKfUD7CDikKE6WRAVESepYhEslLZCqw4ml35Bk4YkxcVRcC04+LFYdXBx1tXBVRAEP0Dc3JwUXaTE/yWFFjEeHPfj3b3H3TtAqJeZanaMA6pmGclYVMxkV8WuVwjoRQCz6JeYqcdTi2l4jq97+Ph6F+FZ3uf+HD1KzmSATySeY7phEW8QT29aOud94hArSgrxOfGYQRckfuS67PIb54LDAs8MGenkPHGIWCy0sdzGrGioxFPEYUXVKF/IuKxw3uKslquseU/+wmBOW0lxneYwYlhCHAmIkFFFCWVYiNCqkWIiSftRD/+Q40+QSyZXCYwcC6hAheT4wf/gd7dmfnLCTQpGgc4X2/4YAbp2gUbNtr+PbbtxAvifgSut5a/UgZlP0mstLXwE9G0DF9ctTd4DLneAwSddMiRH8tMU8nng/Yy+KQsM3AKBNbe35j5OH4A0dbV8AxwcAqMFyl73eHd3e2//nmn29wOGi3Kv+RixSgAAEkxpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDQuNC4wLUV4aXYyIj4KIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgIHhtbG5zOmlwdGNFeHQ9Imh0dHA6Ly9pcHRjLm9yZy9zdGQvSXB0YzR4bXBFeHQvMjAwOC0wMi0yOS8iCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpwbHVzPSJodHRwOi8vbnMudXNlcGx1cy5vcmcvbGRmL3htcC8xLjAvIgogICAgeG1sbnM6R0lNUD0iaHR0cDovL3d3dy5naW1wLm9yZy94bXAvIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIKICAgeG1wTU06RG9jdW1lbnRJRD0iZ2ltcDpkb2NpZDpnaW1wOjdjZDM3NWM3LTcwNmItNDlkMy1hOWRkLWNmM2Q3MmMwY2I4ZCIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2NGY2YTJlYy04ZjA5LTRkZTMtOTY3ZC05MTUyY2U5NjYxNTAiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxMmE1NzI5Mi1kNmJkLTRlYjQtOGUxNi1hODEzYjMwZjU0NWYiCiAgIEdJTVA6QVBJPSIyLjAiCiAgIEdJTVA6UGxhdGZvcm09IldpbmRvd3MiCiAgIEdJTVA6VGltZVN0YW1wPSIxNjEzMzAwNzI5NTMwNjQzIgogICBHSU1QOlZlcnNpb249IjIuMTAuMTIiCiAgIGRjOkZvcm1hdD0iaW1hZ2UvcG5nIgogICBwaG90b3Nob3A6Q3JlZGl0PSJHZXR0eSBJbWFnZXMvaVN0b2NrcGhvdG8iCiAgIHhtcDpDcmVhdG9yVG9vbD0iR0lNUCAyLjEwIgogICB4bXBSaWdodHM6V2ViU3RhdGVtZW50PSJodHRwczovL3d3dy5pc3RvY2twaG90by5jb20vbGVnYWwvbGljZW5zZS1hZ3JlZW1lbnQ/dXRtX21lZGl1bT1vcmdhbmljJmFtcDt1dG1fc291cmNlPWdvb2dsZSZhbXA7dXRtX2NhbXBhaWduPWlwdGN1cmwiPgogICA8aXB0Y0V4dDpMb2NhdGlvbkNyZWF0ZWQ+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpMb2NhdGlvbkNyZWF0ZWQ+CiAgIDxpcHRjRXh0OkxvY2F0aW9uU2hvd24+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpMb2NhdGlvblNob3duPgogICA8aXB0Y0V4dDpBcnR3b3JrT3JPYmplY3Q+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpBcnR3b3JrT3JPYmplY3Q+CiAgIDxpcHRjRXh0OlJlZ2lzdHJ5SWQ+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpSZWdpc3RyeUlkPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpjOTQ2M2MxMC05OWE4LTQ1NDQtYmRlOS1mNzY0ZjdhODJlZDkiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkdpbXAgMi4xMCAoV2luZG93cykiCiAgICAgIHN0RXZ0OndoZW49IjIwMjEtMDItMTRUMTM6MDU6MjkiLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogICA8cGx1czpJbWFnZVN1cHBsaWVyPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6SW1hZ2VTdXBwbGllcj4KICAgPHBsdXM6SW1hZ2VDcmVhdG9yPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6SW1hZ2VDcmVhdG9yPgogICA8cGx1czpDb3B5cmlnaHRPd25lcj4KICAgIDxyZGY6U2VxLz4KICAgPC9wbHVzOkNvcHlyaWdodE93bmVyPgogICA8cGx1czpMaWNlbnNvcj4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgcGx1czpMaWNlbnNvclVSTD0iaHR0cHM6Ly93d3cuaXN0b2NrcGhvdG8uY29tL3Bob3RvL2xpY2Vuc2UtZ20xMTUwMzQ1MzQxLT91dG1fbWVkaXVtPW9yZ2FuaWMmYW1wO3V0bV9zb3VyY2U9Z29vZ2xlJmFtcDt1dG1fY2FtcGFpZ249aXB0Y3VybCIvPgogICAgPC9yZGY6U2VxPgogICA8L3BsdXM6TGljZW5zb3I+CiAgIDxkYzpjcmVhdG9yPgogICAgPHJkZjpTZXE+CiAgICAgPHJkZjpsaT5WbGFkeXNsYXYgU2VyZWRhPC9yZGY6bGk+CiAgICA8L3JkZjpTZXE+CiAgIDwvZGM6Y3JlYXRvcj4KICAgPGRjOmRlc2NyaXB0aW9uPgogICAgPHJkZjpBbHQ+CiAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5TZXJ2aWNlIHRvb2xzIGljb24gb24gd2hpdGUgYmFja2dyb3VuZC4gVmVjdG9yIGlsbHVzdHJhdGlvbi48L3JkZjpsaT4KICAgIDwvcmRmOkFsdD4KICAgPC9kYzpkZXNjcmlwdGlvbj4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PmWJCnkAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQflAg4LBR0CZnO/AAAARHRFWHRDb21tZW50AFNlcnZpY2UgdG9vbHMgaWNvbiBvbiB3aGl0ZSBiYWNrZ3JvdW5kLiBWZWN0b3IgaWxsdXN0cmF0aW9uLlwvEeIAAAMxSURBVHja7Z1bcuQwCEX7qrLQXlp2ynxNVWbK7dgWj3sl9JvYRhxACD369erW7UMzx/cYaychonAQvXM5ABYkpynoYIiEGdoQog6AYfywBrCxF4zNrX/7McBbuXJe8rXx/KBDULcGsMREzCbeZ4J6ME/9wVH5d95rogZp3npEgPLP3m2iUSGqXBJS5Dr6hmLm8kRuZABYti5TMaailV8LodNQwTTUWk4/WZk75l0kM0aZQdaZjMqkrQDAuyMVJWFjMB4GANXr0lbZBxQKr7IjI7QvVWkok/Jn5UHVh61CYPs+/i7eL9j3y/Au8WqoAIC34k8/9k7N8miLcaGWHwgjZXE/awyYX7h41wKMCskZM2HXAddDkTdglpSjz5bcKPbcCEKwT3+DhxtVpJvkEC7rZSgq32NMSBoXaCdiahDCKrND0fpX8oQlVsQ8IFQZ1VARdIF5wroekAjB07gsAgDUIbQHFENIDEX4CQANIVe8Iw/ASiACLXl28eaf579OPuBa9/mrELUYHQ1t3KHlZZnRcXb2/c7ygXIQZqjDMEzeSrOgCAhqYMvTUE+FKXoVxTxgk3DEPREjGzj3nAk/VaKyB9GVIu4oMyOlrQZgrBBEFG9PAZTfs3amYDGrP9Wl964IeFvtz9JFluIvlEvcdoXDOdxggbDxGwTXcxFRi/LdirKgZUBm7SUdJG69IwSUzAMWgOAq/4hyrZVaJISSNWHFVbEoCFEhyBrCtXS9L+so9oTy8wGqxbQDD350WTjNESVFEB5hdKzUGcV5QtYxVWR2Ssl4Mg9qI9u6FCBInJRXgfEEgtS9Cgrg7kKouq4mdcDNBnEHQvWFTdgdgsqP+MiluVeBM13ahx09AYSWi50gsF+I6vn7BmCEoHR3NBzkpIOw4+XdVBBGQUioblaZHbGlodtB+N/jxqwLX/x/NARfD8ADxTOCKIcwE4Lw0OIbguMYcGTlymEpHYLXIKx8zQEqIfS2lGJPaADFEBR/PMH79ErqtpnZmTBlvM4wgihPWDEEhXn1LISj50crNgfCp+dWHYQRCfb2zgfnBZmKGAyi914anK9Coi4LOMhoAn3uVtn+AGnLKxPUZnCuAAAAAElFTkSuQmCC";
  const img = Buffer.from(imgdata, "base64");

  var favicon = (method, tokens, query, body) => {
    console.log("serving favicon...");
    const headers = {
      "Content-Type": "image/png",
      "Content-Length": img.length,
    };
    let result = img;

    return {
      headers,
      result,
    };
  };

  var require$$0 =
    '<!DOCTYPE html>\r\n<html lang="en">\r\n<head>\r\n    <meta charset="UTF-8">\r\n    <meta http-equiv="X-UA-Compatible" content="IE=edge">\r\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\r\n    <title>SUPS Admin Panel</title>\r\n    <style>\r\n        * {\r\n            padding: 0;\r\n            margin: 0;\r\n        }\r\n\r\n        body {\r\n            padding: 32px;\r\n            font-size: 16px;\r\n        }\r\n\r\n        .layout::after {\r\n            content: \'\';\r\n            clear: both;\r\n            display: table;\r\n        }\r\n\r\n        .col {\r\n            display: block;\r\n            float: left;\r\n        }\r\n\r\n        p {\r\n            padding: 8px 16px;\r\n        }\r\n\r\n        table {\r\n            border-collapse: collapse;\r\n        }\r\n\r\n        caption {\r\n            font-size: 120%;\r\n            text-align: left;\r\n            padding: 4px 8px;\r\n            font-weight: bold;\r\n            background-color: #ddd;\r\n        }\r\n\r\n        table, tr, th, td {\r\n            border: 1px solid #ddd;\r\n        }\r\n\r\n        th, td {\r\n            padding: 4px 8px;\r\n        }\r\n\r\n        ul {\r\n            list-style: none;\r\n        }\r\n\r\n        .collection-list a {\r\n            display: block;\r\n            width: 120px;\r\n            padding: 4px 8px;\r\n            text-decoration: none;\r\n            color: black;\r\n            background-color: #ccc;\r\n        }\r\n        .collection-list a:hover {\r\n            background-color: #ddd;\r\n        }\r\n        .collection-list a:visited {\r\n            color: black;\r\n        }\r\n    </style>\r\n    <script type="module">\nimport { html, render } from \'https://unpkg.com/lit-html?module\';\nimport { until } from \'https://unpkg.com/lit-html/directives/until?module\';\n\nconst api = {\r\n    async get(url) {\r\n        return json(url);\r\n    },\r\n    async post(url, body) {\r\n        return json(url, {\r\n            method: \'POST\',\r\n            headers: { \'Content-Type\': \'application/json\' },\r\n            body: JSON.stringify(body)\r\n        });\r\n    }\r\n};\r\n\r\nasync function json(url, options) {\r\n    return await (await fetch(\'/\' + url, options)).json();\r\n}\r\n\r\nasync function getCollections() {\r\n    return api.get(\'data\');\r\n}\r\n\r\nasync function getRecords(collection) {\r\n    return api.get(\'data/\' + collection);\r\n}\r\n\r\nasync function getThrottling() {\r\n    return api.get(\'util/throttle\');\r\n}\r\n\r\nasync function setThrottling(throttle) {\r\n    return api.post(\'util\', { throttle });\r\n}\n\nasync function collectionList(onSelect) {\r\n    const collections = await getCollections();\r\n\r\n    return html`\r\n    <ul class="collection-list">\r\n        ${collections.map(collectionLi)}\r\n    </ul>`;\r\n\r\n    function collectionLi(name) {\r\n        return html`<li><a href="javascript:void(0)" @click=${(ev) => onSelect(ev, name)}>${name}</a></li>`;\r\n    }\r\n}\n\nasync function recordTable(collectionName) {\r\n    const records = await getRecords(collectionName);\r\n    const layout = getLayout(records);\r\n\r\n    return html`\r\n    <table>\r\n        <caption>${collectionName}</caption>\r\n        <thead>\r\n            <tr>${layout.map(f => html`<th>${f}</th>`)}</tr>\r\n        </thead>\r\n        <tbody>\r\n            ${records.map(r => recordRow(r, layout))}\r\n        </tbody>\r\n    </table>`;\r\n}\r\n\r\nfunction getLayout(records) {\r\n    const result = new Set([\'_id\']);\r\n    records.forEach(r => Object.keys(r).forEach(k => result.add(k)));\r\n\r\n    return [...result.keys()];\r\n}\r\n\r\nfunction recordRow(record, layout) {\r\n    return html`\r\n    <tr>\r\n        ${layout.map(f => html`<td>${JSON.stringify(record[f]) || html`<span>(missing)</span>`}</td>`)}\r\n    </tr>`;\r\n}\n\nasync function throttlePanel(display) {\r\n    const active = await getThrottling();\r\n\r\n    return html`\r\n    <p>\r\n        Request throttling: </span>${active}</span>\r\n        <button @click=${(ev) => set(ev, true)}>Enable</button>\r\n        <button @click=${(ev) => set(ev, false)}>Disable</button>\r\n    </p>`;\r\n\r\n    async function set(ev, state) {\r\n        ev.target.disabled = true;\r\n        await setThrottling(state);\r\n        display();\r\n    }\r\n}\n\n//import page from \'//unpkg.com/page/page.mjs\';\r\n\r\n\r\nfunction start() {\r\n    const main = document.querySelector(\'main\');\r\n    editor(main);\r\n}\r\n\r\nasync function editor(main) {\r\n    let list = html`<div class="col">Loading&hellip;</div>`;\r\n    let viewer = html`<div class="col">\r\n    <p>Select collection to view records</p>\r\n</div>`;\r\n    display();\r\n\r\n    list = html`<div class="col">${await collectionList(onSelect)}</div>`;\r\n    display();\r\n\r\n    async function display() {\r\n        render(html`\r\n        <section class="layout">\r\n            ${until(throttlePanel(display), html`<p>Loading</p>`)}\r\n        </section>\r\n        <section class="layout">\r\n            ${list}\r\n            ${viewer}\r\n        </section>`, main);\r\n    }\r\n\r\n    async function onSelect(ev, name) {\r\n        ev.preventDefault();\r\n        viewer = html`<div class="col">${await recordTable(name)}</div>`;\r\n        display();\r\n    }\r\n}\r\n\r\nstart();\n\n</script>\r\n</head>\r\n<body>\r\n    <main>\r\n        Loading&hellip;\r\n    </main>\r\n</body>\r\n</html>';

  const mode = process.argv[2] == "-dev" ? "dev" : "prod";

  const files = {
    index:
      mode == "prod"
        ? require$$0
        : fs__default["default"].readFileSync("./client/index.html", "utf-8"),
  };

  var admin = (method, tokens, query, body) => {
    const headers = {
      "Content-Type": "text/html",
    };
    let result = "";

    const resource = tokens.join("/");
    if (resource && resource.split(".").pop() == "js") {
      headers["Content-Type"] = "application/javascript";

      files[resource] =
        files[resource] ||
        fs__default["default"].readFileSync("./client/" + resource, "utf-8");
      result = files[resource];
    } else {
      result = files.index;
    }

    return {
      headers,
      result,
    };
  };

  /*
   * This service requires util plugin
   */

  const utilService = new Service_1();

  utilService.post("*", onRequest);
  utilService.get(":service", getStatus);

  function getStatus(context, tokens, query, body) {
    return context.util[context.params.service];
  }

  function onRequest(context, tokens, query, body) {
    Object.entries(body).forEach(([k, v]) => {
      console.log(`${k} ${v ? "enabled" : "disabled"}`);
      context.util[k] = v;
    });
    return "";
  }

  var util$1 = utilService.parseRequest;

  var services = {
    jsonstore,
    users,
    data: data$1,
    favicon,
    admin,
    util: util$1,
  };

  const { uuid: uuid$2 } = util;

  function initPlugin(settings) {
    const storage = createInstance(settings.seedData);
    const protectedStorage = createInstance(settings.protectedData);

    return function decoreateContext(context, request) {
      context.storage = storage;
      context.protectedStorage = protectedStorage;
    };
  }

  /**
   * Create storage instance and populate with seed data
   * @param {Object=} seedData Associative array with data. Each property is an object with properties in format {key: value}
   */
  function createInstance(seedData = {}) {
    const collections = new Map();

    // Initialize seed data from file
    for (let collectionName in seedData) {
      if (seedData.hasOwnProperty(collectionName)) {
        const collection = new Map();
        for (let recordId in seedData[collectionName]) {
          if (seedData.hasOwnProperty(collectionName)) {
            collection.set(recordId, seedData[collectionName][recordId]);
          }
        }
        collections.set(collectionName, collection);
      }
    }

    // Manipulation

    /**
     * Get entry by ID or list of all entries from collection or list of all collections
     * @param {string=} collection Name of collection to access. Throws error if not found. If omitted, returns list of all collections.
     * @param {number|string=} id ID of requested entry. Throws error if not found. If omitted, returns of list all entries in collection.
     * @return {Object} Matching entry.
     */
    function get(collection, id) {
      if (!collection) {
        return [...collections.keys()];
      }
      if (!collections.has(collection)) {
        throw new ReferenceError("Collection does not exist: " + collection);
      }
      const targetCollection = collections.get(collection);
      if (!id) {
        const entries = [...targetCollection.entries()];
        let result = entries.map(([k, v]) => {
          return Object.assign(deepCopy(v), { _id: k });
        });
        return result;
      }
      if (!targetCollection.has(id)) {
        throw new ReferenceError("Entry does not exist: " + id);
      }
      const entry = targetCollection.get(id);
      return Object.assign(deepCopy(entry), { _id: id });
    }

    /**
     * Add new entry to collection. ID will be auto-generated
     * @param {string} collection Name of collection to access. If the collection does not exist, it will be created.
     * @param {Object} data Value to store.
     * @return {Object} Original value with resulting ID under _id property.
     */
    function add(collection, data) {
      const record = assignClean({ _ownerId: data._ownerId }, data);

      let targetCollection = collections.get(collection);
      if (!targetCollection) {
        targetCollection = new Map();
        collections.set(collection, targetCollection);
      }
      let id = uuid$2();
      // Make sure new ID does not match existing value
      while (targetCollection.has(id)) {
        id = uuid$2();
      }

      record._createdOn = Date.now();
      targetCollection.set(id, record);
      return Object.assign(deepCopy(record), { _id: id });
    }

    /**
     * Replace entry by ID
     * @param {string} collection Name of collection to access. Throws error if not found.
     * @param {number|string} id ID of entry to update. Throws error if not found.
     * @param {Object} data Value to store. Record will be replaced!
     * @return {Object} Updated entry.
     */
    function set(collection, id, data) {
      if (!collections.has(collection)) {
        throw new ReferenceError("Collection does not exist: " + collection);
      }
      const targetCollection = collections.get(collection);
      if (!targetCollection.has(id)) {
        throw new ReferenceError("Entry does not exist: " + id);
      }

      const existing = targetCollection.get(id);
      const record = assignSystemProps(deepCopy(data), existing);
      record._updatedOn = Date.now();
      targetCollection.set(id, record);
      return Object.assign(deepCopy(record), { _id: id });
    }

    /**
     * Modify entry by ID
     * @param {string} collection Name of collection to access. Throws error if not found.
     * @param {number|string} id ID of entry to update. Throws error if not found.
     * @param {Object} data Value to store. Shallow merge will be performed!
     * @return {Object} Updated entry.
     */
    function merge(collection, id, data) {
      if (!collections.has(collection)) {
        throw new ReferenceError("Collection does not exist: " + collection);
      }
      const targetCollection = collections.get(collection);
      if (!targetCollection.has(id)) {
        throw new ReferenceError("Entry does not exist: " + id);
      }

      const existing = deepCopy(targetCollection.get(id));
      const record = assignClean(existing, data);
      record._updatedOn = Date.now();
      targetCollection.set(id, record);
      return Object.assign(deepCopy(record), { _id: id });
    }

    /**
     * Delete entry by ID
     * @param {string} collection Name of collection to access. Throws error if not found.
     * @param {number|string} id ID of entry to update. Throws error if not found.
     * @return {{_deletedOn: number}} Server time of deletion.
     */
    function del(collection, id) {
      if (!collections.has(collection)) {
        throw new ReferenceError("Collection does not exist: " + collection);
      }
      const targetCollection = collections.get(collection);
      if (!targetCollection.has(id)) {
        throw new ReferenceError("Entry does not exist: " + id);
      }
      targetCollection.delete(id);

      return { _deletedOn: Date.now() };
    }

    /**
     * Search in collection by query object
     * @param {string} collection Name of collection to access. Throws error if not found.
     * @param {Object} query Query object. Format {prop: value}.
     * @return {Object[]} Array of matching entries.
     */
    function query(collection, query) {
      if (!collections.has(collection)) {
        throw new ReferenceError("Collection does not exist: " + collection);
      }
      const targetCollection = collections.get(collection);
      const result = [];
      // Iterate entries of target collection and compare each property with the given query
      for (let [key, entry] of [...targetCollection.entries()]) {
        let match = true;
        for (let prop in entry) {
          if (query.hasOwnProperty(prop)) {
            const targetValue = query[prop];
            // Perform lowercase search, if value is string
            if (
              typeof targetValue === "string" &&
              typeof entry[prop] === "string"
            ) {
              if (
                targetValue.toLocaleLowerCase() !==
                entry[prop].toLocaleLowerCase()
              ) {
                match = false;
                break;
              }
            } else if (targetValue != entry[prop]) {
              match = false;
              break;
            }
          }
        }

        if (match) {
          result.push(Object.assign(deepCopy(entry), { _id: key }));
        }
      }

      return result;
    }

    return { get, add, set, merge, delete: del, query };
  }

  function assignSystemProps(target, entry, ...rest) {
    const whitelist = ["_id", "_createdOn", "_updatedOn", "_ownerId"];
    for (let prop of whitelist) {
      if (entry.hasOwnProperty(prop)) {
        target[prop] = deepCopy(entry[prop]);
      }
    }
    if (rest.length > 0) {
      Object.assign(target, ...rest);
    }

    return target;
  }

  function assignClean(target, entry, ...rest) {
    const blacklist = ["_id", "_createdOn", "_updatedOn", "_ownerId"];
    for (let key in entry) {
      if (blacklist.includes(key) == false) {
        target[key] = deepCopy(entry[key]);
      }
    }
    if (rest.length > 0) {
      Object.assign(target, ...rest);
    }

    return target;
  }

  function deepCopy(value) {
    if (Array.isArray(value)) {
      return value.map(deepCopy);
    } else if (typeof value == "object") {
      return [...Object.entries(value)].reduce(
        (p, [k, v]) => Object.assign(p, { [k]: deepCopy(v) }),
        {}
      );
    } else {
      return value;
    }
  }

  var storage = initPlugin;

  const {
    ConflictError: ConflictError$1,
    CredentialError: CredentialError$1,
    RequestError: RequestError$2,
  } = errors;

  function initPlugin$1(settings) {
    const identity = settings.identity;

    return function decorateContext(context, request) {
      context.auth = {
        register,
        login,
        logout,
      };

      const userToken = request.headers["x-authorization"];
      if (userToken !== undefined) {
        let user;
        const session = findSessionByToken(userToken);
        if (session !== undefined) {
          const userData = context.protectedStorage.get(
            "users",
            session.userId
          );
          if (userData !== undefined) {
            console.log("Authorized as " + userData[identity]);
            user = userData;
          }
        }
        if (user !== undefined) {
          context.user = user;
        } else {
          throw new CredentialError$1("Invalid access token");
        }
      }

      function register(body) {
        if (
          body.hasOwnProperty(identity) === false ||
          body.hasOwnProperty("password") === false ||
          body[identity].length == 0 ||
          body.password.length == 0
        ) {
          throw new RequestError$2("Missing fields");
        } else if (
          context.protectedStorage.query("users", {
            [identity]: body[identity],
          }).length !== 0
        ) {
          throw new ConflictError$1(
            `A user with the same ${identity} already exists`
          );
        } else {
          const newUser = Object.assign({}, body, {
            [identity]: body[identity],
            hashedPassword: hash(body.password),
          });
          const result = context.protectedStorage.add("users", newUser);
          delete result.hashedPassword;

          const session = saveSession(result._id);
          result.accessToken = session.accessToken;

          return result;
        }
      }

      function login(body) {
        const targetUser = context.protectedStorage.query("users", {
          [identity]: body[identity],
        });
        if (targetUser.length == 1) {
          if (hash(body.password) === targetUser[0].hashedPassword) {
            const result = targetUser[0];
            delete result.hashedPassword;

            const session = saveSession(result._id);
            result.accessToken = session.accessToken;

            return result;
          } else {
            throw new CredentialError$1("Login or password don't match");
          }
        } else {
          throw new CredentialError$1("Login or password don't match");
        }
      }

      function logout() {
        if (context.user !== undefined) {
          const session = findSessionByUserId(context.user._id);
          if (session !== undefined) {
            context.protectedStorage.delete("sessions", session._id);
          }
        } else {
          throw new CredentialError$1("User session does not exist");
        }
      }

      function saveSession(userId) {
        let session = context.protectedStorage.add("sessions", { userId });
        const accessToken = hash(session._id);
        session = context.protectedStorage.set(
          "sessions",
          session._id,
          Object.assign({ accessToken }, session)
        );
        return session;
      }

      function findSessionByToken(userToken) {
        return context.protectedStorage.query("sessions", {
          accessToken: userToken,
        })[0];
      }

      function findSessionByUserId(userId) {
        return context.protectedStorage.query("sessions", { userId })[0];
      }
    };
  }

  const secret = "This is not a production server";

  function hash(string) {
    const hash = crypto__default["default"].createHmac("sha256", secret);
    hash.update(string);
    return hash.digest("hex");
  }

  var auth = initPlugin$1;

  function initPlugin$2(settings) {
    const util = {
      throttle: false,
    };

    return function decoreateContext(context, request) {
      context.util = util;
    };
  }

  var util$2 = initPlugin$2;

  /*
   * This plugin requires auth and storage plugins
   */

  const {
    RequestError: RequestError$3,
    ConflictError: ConflictError$2,
    CredentialError: CredentialError$2,
    AuthorizationError: AuthorizationError$2,
  } = errors;

  function initPlugin$3(settings) {
    const actions = {
      GET: ".read",
      POST: ".create",
      PUT: ".update",
      PATCH: ".update",
      DELETE: ".delete",
    };
    const rules = Object.assign(
      {
        "*": {
          ".create": ["User"],
          ".update": ["Owner"],
          ".delete": ["Owner"],
        },
      },
      settings.rules
    );

    return function decorateContext(context, request) {
      // special rules (evaluated at run-time)
      const get = (collectionName, id) => {
        return context.storage.get(collectionName, id);
      };
      const isOwner = (user, object) => {
        return user._id == object._ownerId;
      };
      context.rules = {
        get,
        isOwner,
      };
      const isAdmin = request.headers.hasOwnProperty("x-admin");

      context.canAccess = canAccess;

      function canAccess(data, newData) {
        const user = context.user;
        const action = actions[request.method];
        let { rule, propRules } = getRule(
          action,
          context.params.collection,
          data
        );

        if (Array.isArray(rule)) {
          rule = checkRoles(rule, data);
        } else if (typeof rule == "string") {
          rule = !!eval(rule);
        }
        if (!rule && !isAdmin) {
          throw new CredentialError$2();
        }
        propRules.map((r) => applyPropRule(action, r, user, data, newData));
      }

      function applyPropRule(action, [prop, rule], user, data, newData) {
        // NOTE: user needs to be in scope for eval to work on certain rules
        if (typeof rule == "string") {
          rule = !!eval(rule);
        }

        if (rule == false) {
          if (action == ".create" || action == ".update") {
            delete newData[prop];
          } else if (action == ".read") {
            delete data[prop];
          }
        }
      }

      function checkRoles(roles, data, newData) {
        if (roles.includes("Guest")) {
          return true;
        } else if (!context.user && !isAdmin) {
          throw new AuthorizationError$2();
        } else if (roles.includes("User")) {
          return true;
        } else if (context.user && roles.includes("Owner")) {
          return context.user._id == data._ownerId;
        } else {
          return false;
        }
      }
    };

    function getRule(action, collection, data = {}) {
      let currentRule = ruleOrDefault(true, rules["*"][action]);
      let propRules = [];

      // Top-level rules for the collection
      const collectionRules = rules[collection];
      if (collectionRules !== undefined) {
        // Top-level rule for the specific action for the collection
        currentRule = ruleOrDefault(currentRule, collectionRules[action]);

        // Prop rules
        const allPropRules = collectionRules["*"];
        if (allPropRules !== undefined) {
          propRules = ruleOrDefault(
            propRules,
            getPropRule(allPropRules, action)
          );
        }

        // Rules by record id
        const recordRules = collectionRules[data._id];
        if (recordRules !== undefined) {
          currentRule = ruleOrDefault(currentRule, recordRules[action]);
          propRules = ruleOrDefault(
            propRules,
            getPropRule(recordRules, action)
          );
        }
      }

      return {
        rule: currentRule,
        propRules,
      };
    }

    function ruleOrDefault(current, rule) {
      return rule === undefined || rule.length === 0 ? current : rule;
    }

    function getPropRule(record, action) {
      const props = Object.entries(record)
        .filter(([k]) => k[0] != ".")
        .filter(([k, v]) => v.hasOwnProperty(action))
        .map(([k, v]) => [k, v[action]]);

      return props;
    }
  }

  var rules = initPlugin$3;

  var identity = "email";
  var protectedData = {
    users: {
      "35c62d76-8152-4626-8712-eeb96381bea8": {
        email: "peter@abv.bg",
        username: "Peter",
        hashedPassword:
          "83313014ed3e2391aa1332615d2f053cf5c1bfe05ca1cbcb5582443822df6eb1",
      },
      "847ec027-f659-4086-8032-5173e2f9c93a": {
        email: "george@abv.bg",
        username: "George",
        hashedPassword:
          "83313014ed3e2391aa1332615d2f053cf5c1bfe05ca1cbcb5582443822df6eb1",
      },
      "60f0cf0b-34b0-4abd-9769-8c42f830dffc": {
        email: "admin@abv.bg",
        username: "Admin",
        hashedPassword:
          "fac7060c3e17e6f151f247eacb2cd5ae80b8c36aedb8764e18a41bbdc16aa302",
      },
    },
    sessions: {},
  };
  var seedData = {
    blogs: {
      "208a0ac2-698a-4401-8ee5-2fd57f678955": {
        _id: "208a0ac2-698a-4401-8ee5-2fd57f678955",
        title: "10 Essential Tips for Achieving the Perfect Body",
        imageUrl:
          "https://static1.squarespace.com/static/58e43b4e2994ca997dda262c/t/5ae120af03ce649859a3fb0d/1524703418804/kayla+ps+.png?format=1500w",
        _createdOn: 1699264800000,
        _ownerId: "35c62d76-8152-4626-8712-eeb96381bea8",
        text: "Achieving the perfect body requires dedication, discipline, and a commitment to a healthy lifestyle. Here are 10 essential tips to help you on your journey:\n\n1. Set realistic goals and create a plan.\n2. Maintain a balanced diet with plenty of fruits and vegetables.\n3. Incorporate regular exercise into your routine, including cardio and strength training.\n4. Stay hydrated by drinking enough water throughout the day.\n5. Get enough sleep to allow your body to recover and repair itself.\n6. Avoid crash diets and focus on sustainable, long-term changes.\n7. Manage stress through relaxation techniques like meditation or yoga.\n8. Surround yourself with a supportive and positive community.\n9. Listen to your body and rest when needed to prevent burnout.\n10. Monitor your progress and make adjustments as necessary.\n\nRemember, the perfect body is a subjective concept, and the most important thing is to prioritize your health and well-being.",
      },
      "e94895b0-9dc1-435a-aa48-ba74415b564d": {
        _id: "e94895b0-9dc1-435a-aa48-ba74415b564d",
        title:
          "The Importance of Nutrition in Your Body Transformation Journey",
        imageUrl:
          "https://www.indy100.com/media-library/picture.jpg?id=28117167&width=1245&height=700&quality=85&coordinates=69%2C0%2C69%2C0",
        _createdOn: 1699268400000,
        _ownerId: "847ec027-f659-4086-8032-5173e2f9c93a",
        text: "When it comes to achieving the perfect body, nutrition plays a crucial role. Here are some key tips to ensure you're getting the most out of your diet:\n\n1. Focus on a balanced diet that includes carbohydrates, proteins, and healthy fats.\n2. Eat a variety of nutrient-rich foods to ensure you get all the necessary vitamins and minerals.\n3. Control portion sizes to avoid overeating and excessive calorie intake.\n4. Stay mindful of your calorie consumption, especially if you're trying to lose weight.\n5. Incorporate lean proteins like chicken, fish, and beans to support muscle growth and repair.\n6. Consume whole grains for sustained energy and fiber.\n7. Limit your intake of processed and sugary foods, which can lead to weight gain and health issues.\n8. Stay hydrated by drinking plenty of water throughout the day.\n9. Plan your meals and snacks in advance to avoid making unhealthy choices.\n10. Consider consulting with a registered dietitian for personalized guidance and meal plans tailored to your goals.\n\nRemember, your body's transformation is a holistic journey, and nutrition is a fundamental building block for achieving your goals.",
      },
      "8b7d4f31-62a4-4cf6-9b24-7ea4e67c5789": {
        _id: "8b7d4f31-62a4-4cf6-9b24-7ea4e67c5789",
        title: "Pilates for Beginners: A Step-by-Step Guide",
        imageUrl:
          "https://c4.wallpaperflare.com/wallpaper/816/931/806/women-pose-workout-fitness-wallpaper-preview.jpg",
        _createdOn: 1699272000000,
        _ownerId: "27a9cb18-5e4f-47c0-84a8-7bb66182f9e8",
        text: "Pilates is a fantastic exercise method that can help improve your strength, flexibility, and overall well-being. If you're new to Pilates, it's essential to start with the basics to ensure a safe and effective workout. In this beginner's guide, we'll walk you through the fundamentals of Pilates.\n\nHere are some key steps to get started:\n\n1. **Understand the Principles:** Before you dive into exercises, familiarize yourself with the core principles of Pilates, including control, concentration, centering, precision, breath, and flow. These principles will guide your practice.\n\n2. **Warm-Up:** Begin your Pilates session with a gentle warm-up to prepare your body for the exercises. Focus on deep breathing and gentle stretches to loosen up your muscles.\n\n3. **Mat or Equipment:** Decide if you want to start with mat Pilates or using equipment like a Reformer. Mat Pilates is an excellent choice for beginners, as it doesn't require any specialized equipment.\n\n4. **Learn the Basics:** Start with foundational exercises like the Pilates Hundred, The Roll-Up, and The Single Leg Stretch. These exercises will help you build a strong core and improve your posture.\n\n5. **Posture and Alignment:** Pay close attention to your posture and alignment during each exercise. Proper form is essential for safety and effectiveness.\n\n6. **Focus on Breath:** Breathing is a crucial aspect of Pilates. Coordinate your breath with your movements, and practice deep, controlled breathing throughout the session.\n\n7. **Consistency is Key:** Like any form of exercise, consistency is vital. Aim to practice Pilates regularly to experience its full benefits.\n\n8. **Listen to Your Body:** While pushing your limits is essential for progress, always listen to your body. If you experience pain or discomfort, modify the exercise or consult a professional.\n\n9. **Seek Guidance:** Consider taking classes with a certified Pilates instructor to ensure you're learning the correct techniques and getting the most out of your practice.\n\n10. **Enjoy the Journey:** Pilates is not just about physical fitness; it's also about mental well-being. Enjoy the process, and stay patient with yourself as you progress.\n\nRemember, Pilates is a journey, and it's all about developing a strong, flexible, and balanced body. With dedication and the right guidance, you can reap the many benefits of this wonderful exercise method.",
      },
      "c4a9c72f-1234-4a5e-9b86-321a8e5d6a7b": {
        _id: "c4a9c72f-1234-4a5e-9b86-321a8e5d6a7b",
        title:
          "Energizing Fitness Summer Food: Fuel Your Workouts and Stay Cool",
        imageUrl:
          "https://avatars.dzeninfra.ru/get-zen_doc/1587012/pub_5d9f81137cccba00ae6424cf_5d9f81983f548700add10c7c/scale_2400",
        _createdOn: 1699286400000,
        _ownerId: "ac2b6002-f33f-4999-90aa-3400a6261cf8",
        text: "Summer is the perfect time to get active and enjoy the outdoors, but it's essential to fuel your workouts and stay cool in the heat. Here are some delicious and nutritious fitness summer food ideas to help you on your fitness journey:\n\n1. **Hydrating Watermelon:** Stay hydrated with water-rich watermelon. It's a great source of vitamins and minerals while helping you beat the summer heat.\n\n2. **Grilled Chicken and Veggie Skewers:** Load up skewers with lean grilled chicken and an assortment of fresh veggies. They are protein-packed and low in calories.\n\n3. **Greek Yogurt Parfait:** Create a parfait with Greek yogurt, fresh berries, and a drizzle of honey. It's a great post-workout snack for muscle recovery.\n\n4. **Iced Green Tea:** Replace sugary beverages with refreshing iced green tea. It's packed with antioxidants and can help boost your metabolism.\n\n5. **Quinoa Salad:** Make a quinoa salad with colorful vegetables and a light vinaigrette. Quinoa provides protein and complex carbs for sustained energy.\n\n6. **Cold Pasta Salad:** Opt for whole grain pasta, toss it with veggies and lean protein like shrimp or grilled chicken, and dress it with a light vinaigrette.\n\n7. **Smoothie Bowl:** Blend your favorite fruits with Greek yogurt and top the smoothie bowl with granola, nuts, and seeds for a satisfying and nutritious meal.\n\n8. **Chia Seed Pudding:** Make chia seed pudding with almond milk and top it with fresh fruit and a sprinkle of nuts. It's an excellent source of omega-3 fatty acids.\n\n9. **Frozen Grapes:** Freeze grapes for a cool, sweet treat that's easy to snack on during a hot summer day.\n\n10. **Protein-Packed Popsicles:** Create your own popsicles using protein-rich ingredients like Greek yogurt and fruits. They are a fun way to refuel after a workout.\n\nFueling your body with these fitness summer food options will help you stay energized, support your workouts, and maintain a healthy, active lifestyle during the summer months.",
      },
      "e7f6b33a-9a84-4c71-8174-46f23785b9ac": {
        _id: "e7f6b33a-9a84-4c71-8174-46f23785b9ac",
        title: "Neck Exercises: Relieve Tension and Improve Mobility",
        imageUrl:
          "https://evolvemagazine.ca/storage/2022/04/NoPath-Copy-46.png",
        _createdOn: 1699293600000,
        _ownerId: "f8ab456f-57ac-4b97-be2f-4e410e33cfe5",
        text: "The neck is a crucial part of our body, and it's essential to keep it healthy and mobile. Neck exercises can help you relieve tension, reduce stiffness, and improve overall neck mobility. Here's a guide to some effective neck exercises:\n\n1. **Neck Tilts:** Sit or stand with your back straight. Gently tilt your head to the right, bringing your right ear toward your right shoulder. Hold for a few seconds, then return to the neutral position. Repeat on the left side. Perform 10-15 reps on each side.\n\n2. **Neck Rotations:** Slowly turn your head to the right, trying to bring your chin towards your shoulder. Hold for a few seconds, then return to the center. Repeat on the left side. Do 10-15 repetitions on each side.\n\n3. **Neck Flexion and Extension:** Sit or stand with your back straight. Gently tilt your head forward to bring your chin towards your chest (flexion). Hold for a few seconds, then slowly extend your neck backward (extension). Perform 10-15 repetitions of this sequence.\n\n4. **Shoulder Blade Squeezes:** Sit or stand with your back straight and your arms at your sides. Squeeze your shoulder blades together while keeping your neck straight. Hold for a few seconds and then release. Do 10-15 repetitions.\n\n5. **Chin Tucks:** Sit or stand with your back straight. Gently tuck your chin towards your chest while maintaining good posture. Hold for a few seconds and then release. Perform 10-15 repetitions.\n\n6. **Resistance Band Exercises:** Attach a resistance band to a fixed point and stand with your back to it. Hold one end of the band in each hand. Slowly pull the band forward and backward, engaging your neck muscles. This exercise helps strengthen your neck. Perform 10-15 reps.\n\n7. **Neck Circles:** Gently rotate your head in a circular motion, moving it clockwise for 10-15 seconds and then counterclockwise for another 10-15 seconds. This exercise improves neck mobility.\n\nAlways perform these exercises with control and in a pain-free range of motion. If you experience discomfort or pain, consult a healthcare professional. Regular neck exercises can help maintain a healthy and flexible neck, reducing the risk of stiffness and discomfort.",
      },
      "72d8e90f-1a24-4b92-863d-9e3f108c4d4a": {
        _id: "72d8e90f-1a24-4b92-863d-9e3f108c4d4a",
        title: "Weight Lifting Tips: Techniques for Success",
        imageUrl:
          "https://pbs.twimg.com/media/CJV7qqsVAAArhm-?format=jpg&name=medium",
        _createdOn: 1699300800000,
        _ownerId: "ce6ffcd5-345d-4d3a-8280-c782d16aea5c",
        text: "Weight lifting is an excellent way to build strength, increase muscle mass, and improve overall fitness. Whether you're a beginner or an experienced lifter, these weight lifting tips can help you make the most of your workouts and achieve your fitness goals:\n\n1. **Start with Proper Warm-Up:** Always begin your weight lifting session with a thorough warm-up. Engage in dynamic stretches, light cardio, and mobility exercises to prepare your muscles for the workout ahead.\n\n2. **Focus on Form:** Correct form is essential for preventing injuries and targeting the right muscles. Prioritize good form over lifting heavy weights. Start with lighter weights to perfect your form before progressing to heavier loads.\n\n3. **Progressive Overload:** Gradually increase the weight you lift over time to challenge your muscles and promote growth. Keep a workout log to track your progress and set achievable goals.\n\n4. **Rest and Recovery:** Allow your muscles time to recover between weight lifting sessions. Aim for 48-72 hours of rest for each muscle group. This is when muscle growth occurs.\n\n5. **Compound Exercises:** Incorporate compound exercises like squats, deadlifts, and bench presses into your routine. These exercises work multiple muscle groups simultaneously and can lead to more efficient workouts.\n\n6. **Balanced Diet:** Proper nutrition is essential for muscle recovery and growth. Consume a balanced diet with adequate protein, carbohydrates, and healthy fats to support your workouts.\n\n7. **Stay Hydrated:** Dehydration can hinder your performance and lead to muscle cramps. Drink plenty of water before, during, and after your weight lifting sessions.\n\n8. **Breathing Technique:** Pay attention to your breathing. Exhale during the exertion phase and inhale during the relaxation phase of an exercise to maintain proper oxygen flow to your muscles.\n\n9. **Variety in Workouts:** Avoid workout plateaus by changing your routine regularly. Incorporate different exercises, rep ranges, and training methods to keep your workouts challenging and engaging.\n\n10. **Listen to Your Body:** If you experience pain or discomfort, stop the exercise and assess your form. Don't push through pain, as it can lead to injuries. Consult with a fitness professional if you're unsure about your form or workout plan.\n\nBy following these weight lifting tips and staying consistent with your workouts, you'll be well on your way to achieving your fitness goals and building a stronger, healthier body.",
      },
      "ea7d421f-3b84-4cf1-92dd-5d7e9fb29f1c": {
        _id: "ea7d421f-3b84-4cf1-92dd-5d7e9fb29f1c",
        title: "Discover the Benefits of Yoga Classes",
        imageUrl:
          "https://blog.ifit.com/wp-content/uploads/2014/11/commit-blog2.jpg",
        _createdOn: 1699308000000,
        _ownerId: "111b6168-7406-4e12-9aea-f2c7b2a7f966",
        text: "Yoga is a practice that has been around for thousands of years, and for a good reason. It offers numerous physical and mental benefits, making it a popular choice for people of all ages and fitness levels. If you're considering attending yoga classes, here's what you can expect and why it's a great choice for your well-being:\n\n1. **Improved Flexibility:** Yoga involves a series of poses and stretches that can help increase your flexibility over time. Regular practice can lead to improved range of motion and reduced muscle stiffness.\n\n2. **Stress Reduction:** Yoga emphasizes mindfulness and deep breathing. It's a fantastic way to manage stress and promote relaxation. The practice of yoga can help reduce anxiety and increase feelings of calm and peace.\n\n3. **Strength and Balance:** Many yoga poses require the engagement of various muscle groups, leading to improved strength and balance. This can be particularly beneficial as we age, helping to prevent falls and injuries.\n\n4. **Better Posture:** Yoga classes often focus on body alignment and posture. As you become more aware of your body's alignment, you can carry these principles into your daily life, leading to improved posture and reduced back and neck pain.\n\n5. **Mental Clarity:** Yoga encourages mindfulness and meditation. Regular practice can help clear your mind, increase focus, and enhance mental clarity. It's a great way to recharge and improve concentration.\n\n6. **Community and Support:** Attending yoga classes can introduce you to a community of like-minded individuals who share your commitment to well-being. This sense of belonging can be motivating and provide emotional support.\n\n7. **Variety of Styles:** Yoga offers a wide range of styles to choose from, including Hatha, Vinyasa, Ashtanga, and more. You can find a style that suits your preferences and fitness goals.\n\n8. **Adaptability:** Yoga classes are adaptable to various fitness levels. Whether you're a beginner or an experienced yogi, instructors can provide modifications and challenges to suit your needs.\n\n9. **Inner Peace:** Yoga encourages self-reflection and self-awareness. It's an opportunity to connect with your inner self, find inner peace, and promote overall well-being.\n\n10. **Increased Energy:** Although yoga can be a gentle practice, it can also invigorate your body and boost energy levels. Many people report feeling more energized after a yoga session.\n\nIf you're looking to improve your physical and mental well-being, consider attending yoga classes. It's a holistic practice that can help you find balance, peace, and vitality in your life.",
      },
      "ab56c8d2-7a33-4e10-8a57-36c16f9c183a": {
        _id: "ab56c8d2-7a33-4e10-8a57-36c16f9c183a",
        title:
          "Weight Loss Vs Fat Loss: Why You Shouldn’t Focus On Losing Weight",
        imageUrl:
          "https://c.wallhere.com/photos/9b/b9/women_fitness_model_gym_clothes-317531.jpg!s2",
        _createdOn: 1699351200000,
        _ownerId: "662a1b9a-0bc5-44e0-97c1-124d705c511c",
        text: "The pursuit of a healthier and fitter body is a common goal for many. However, it's important to understand the distinction between weight loss and fat loss, as they are not the same. Focusing solely on losing weight can be misleading and counterproductive. Here's why you should prioritize fat loss over weight loss:\n\n1. **Muscle vs. Fat:** When you aim for weight loss, it can lead to a reduction in both fat and muscle mass. In contrast, focusing on fat loss specifically targets excess body fat while preserving and even building muscle. This is crucial for maintaining a healthy metabolism and achieving a lean, toned physique.\n\n2. **Health Over Numbers:** The number on the scale doesn't provide a complete picture of your health. Weight can fluctuate due to factors like water retention, muscle gain, and more. Instead, monitor your body composition, which includes the percentage of body fat, muscle, and overall health indicators.\n\n3. **Sustainable Lifestyle:** Quick-fix diets and extreme weight loss approaches are often unsustainable in the long run. They can lead to muscle loss, nutrient deficiencies, and can be harmful to your overall well-being. Embracing a balanced and sustainable approach to fat loss is more beneficial for your health.\n\n4. **Body Composition:** It's essential to consider your body composition. Two individuals with the same weight can look significantly different based on their body fat percentage. Focusing on fat loss can help you achieve a healthier and more aesthetically pleasing physique.\n\n5. **Metabolism:** Losing muscle mass can slow down your metabolism, making it harder to maintain or continue losing weight. By prioritizing fat loss and retaining muscle, you can support a healthy metabolic rate.\n\n6. **Long-Term Success:** Fat loss is a more reliable indicator of long-term success in maintaining a healthy body. It's about making sustainable lifestyle changes that promote overall well-being and body composition improvements.\n\n7. **Energy and Strength:** Focusing on fat loss allows you to maintain energy levels and strength, which are essential for an active and fulfilling life. Rapid weight loss can lead to fatigue and weakness.\n\n8. **Positive Self-Image:** Achieving a lower body fat percentage can boost your confidence and improve your self-image. It's more gratifying to see a toned body in the mirror than to solely see a smaller number on the scale.\n\nIn conclusion, when striving for a healthier and fitter you, prioritize fat loss over weight loss. Embrace a balanced diet, regular exercise, and a sustainable lifestyle to achieve a body composition that is both healthy and aesthetically satisfying. Remember that it's not just about the number on the scale, but about the overall well-being and body composition that you can sustain for the long term.",
      },
      "2e91f5e4-0d8c-4f81-9baf-c4e0b1f1a35d": {
        _id: "2e91f5e4-0d8c-4f81-9baf-c4e0b1f1a35d",
        title: "Exercises for a Thin Waist: Sculpt Your Midsection",
        imageUrl:
          "https://www.alberodeidesideri.org/wp-content/uploads/2011/09/pilates-montebelluna-1.jpg",
        _createdOn: 1699358400000,
        _ownerId: "b1a3489e-ea44-4c81-b46b-0009791522ca",
        text: "A slim and toned waistline is a fitness goal for many, and it's achievable with the right exercises and consistent effort. If you're looking to sculpt your midsection and achieve a thin waist, these exercises can help you get there:\n\n1. **Planks:** Planks are excellent for strengthening your core, including your obliques, which help shape your waist. Start with the traditional plank and then progress to side planks for extra oblique work.\n\n2. **Russian Twists:** Sit on the floor with your knees bent and feet lifted. Lean back slightly and twist your torso to one side, then the other, while holding a weight or medicine ball. This exercise targets your obliques.\n\n3. **Bicycle Crunches:** Lie on your back, lift your shoulders off the ground, and bring your left elbow towards your right knee, then switch sides. Bicycle crunches engage your obliques and rectus abdominis.\n\n4. **Leg Raises:** Lie on your back with your legs straight. Lift your legs off the ground, keeping them together, and then lower them without touching the floor. This exercise works your lower abs, which can help create a smaller waist appearance.\n\n5. **Standing Side Leg Lifts:** Stand with your feet hip-width apart and lift one leg out to the side. This exercise targets the muscles of your hips and obliques, helping to trim your waistline.\n\n6. **Hula Hooping:** Using a hula hoop is a fun way to engage your core and work on your waistline. It's a great low-impact exercise that can help tone your midsection.\n\n7. **Wood Choppers:** Stand with your feet shoulder-width apart, hold a dumbbell or medicine ball with both hands, and twist your torso to one side while lowering the weight diagonally across your body. Then, repeat on the other side. This exercise targets your obliques and provides a slimming effect.\n\n8. **Plank Hip Dips:** While in a forearm plank position, lower your hips to one side without touching the ground, then switch to the other side. This exercise is great for targeting the obliques and creating a slimmer waistline.\n\n9. **Side Crunches:** Lie on your side, bend your knees, and place your top hand behind your head. Lift your upper body off the ground to target the oblique muscles on your side.\n\n10. **Twisting Mountain Climbers:** Perform mountain climbers, but with a twist. While in a plank position, bring your right knee towards your left elbow, and then your left knee towards your right elbow. This exercise engages your obliques and core.\n\nRemember to combine these exercises with a balanced diet and cardio workouts to maximize your results. Consistency and proper form are key to achieving a slim and toned waist.",
      },
      "f3b2c7e8-6a41-4f9e-843d-8e7f9d6c478d": {
        _id: "f3b2c7e8-6a41-4f9e-843d-8e7f9d6c478d",
        title: "The Best Post-Workout Snacks: Refuel and Recover Effectively",
        imageUrl:
          "https://d2z0k43lzfi12d.cloudfront.net/blog/vcdn374/wp-content/uploads/2018/02/533_post-workout-snacks_ft.jpg.webp",
        _createdOn: 1699365600000,
        _ownerId: "fbcd2e95-eac5-4c20-be8a-fab2b3b43d08",
        text: "After a challenging workout, your body needs proper nutrition to refuel and recover. Post-workout snacks are essential to replenish energy, repair muscles, and support overall recovery. Here are some of the best post-workout snacks to consider:\n\n1. **Protein Smoothie:** A protein smoothie is an excellent choice for post-workout recovery. Blend your favorite protein powder with Greek yogurt, fruits, and a splash of almond milk. Protein aids in muscle repair and growth, while carbohydrates from fruits provide energy.\n\n2. **Banana with Almond Butter:** Bananas are rich in potassium, which can help replenish electrolytes lost during exercise. Pair a banana with a tablespoon of almond butter for a quick and satisfying post-workout snack.\n\n3. **Greek Yogurt with Berries:** Greek yogurt is a great source of protein and probiotics. Top it with fresh berries for added antioxidants and natural sweetness. It's a balanced snack that supports muscle recovery and digestive health.\n\n4. **Hummus and Veggies:** Hummus is a source of plant-based protein and healthy fats. Dip sliced vegetables like carrots, cucumbers, and bell peppers into hummus for a nutrient-rich post-workout option.\n\n5. **Oatmeal with Nut Butter:** Cook up a bowl of oatmeal and stir in your favorite nut butter for added protein and healthy fats. Oatmeal provides complex carbohydrates to replenish energy stores.\n\n6. **Hard-Boiled Eggs:** Hard-boiled eggs are an excellent source of protein and essential amino acids. They are convenient and easy to prepare for a quick post-workout snack.\n\n7. **Chocolate Milk:** Believe it or not, chocolate milk is a popular choice for recovery. It provides a balance of protein and carbohydrates, making it a tasty and effective post-workout option.\n\n8. **Cottage Cheese with Pineapple:** Cottage cheese is a high-protein snack that pairs well with pineapple chunks. The combination of protein and natural sugars supports recovery and muscle repair.\n\n9. **Quinoa Salad:** If you prefer a heartier post-workout snack, consider a quinoa salad with vegetables and a lean protein source like grilled chicken or tofu. Quinoa is rich in protein and essential amino acids.\n\n10. **Trail Mix:** Create a custom trail mix with a mix of nuts, dried fruits, and a few dark chocolate chips. This combination offers a blend of healthy fats, protein, and carbohydrates to aid recovery.\n\nIt's important to consume your post-workout snack within 30 minutes to 2 hours after your workout to optimize recovery. Choose snacks that provide a balance of protein, carbohydrates, and healthy fats based on your dietary preferences and fitness goals.",
      },
      "d8e7b6f1-3c45-43d9-87b1-9c8e4f5a6dcb": {
        _id: "d8e7b6f1-3c45-43d9-87b1-9c8e4f5a6dcb",
        title:
          "Holiday Survival Cardio Challenge: Stay Fit During Festive Season",
        imageUrl:
          "https://lovesweatfitness.com/cdn/shop/articles/HSCBlog_FEATURE_IMAGE.jpg?v=1698435947",
        _createdOn: 1699372800000,
        _ownerId: "86db06bd-3adb-4815-a062-cc13118474a0",
        text: "The holiday season is a time of celebration, family gatherings, and delicious feasts. It can also be a challenging time to maintain your fitness routine. However, you can stay on track and even have fun with a Holiday Survival Cardio Challenge. Here's how you can keep your cardio workouts engaging and effective during the festive season:\n\n1. **Festive Fun Runs:** Many communities host holiday-themed fun runs, like Turkey Trots or Jingle Bell Runs. Participate in these events to combine fitness with the holiday spirit. It's a great way to bond with loved ones and support local charities.\n\n2. **Indoor Workouts:** If the weather is less than ideal, consider indoor activities like dancing, indoor cycling, or swimming at a local pool. These options provide a full-body workout and can be a fun way to stay active during the holidays.\n\n3. **HIIT Workouts:** High-Intensity Interval Training (HIIT) workouts are efficient and time-effective. You can complete a challenging HIIT session in as little as 20-30 minutes. Incorporate bodyweight exercises, jumping jacks, and burpees for a heart-pumping workout.\n\n4. **Stay Consistent:** While your schedule may be busier during the holidays, try to stick to your regular workout routine. Prioritize your health by scheduling workouts as you would other holiday events.\n\n5. **Family Fitness Challenges:** Get the whole family involved in friendly fitness challenges. Whether it's a push-up contest, a game of tag, or a dance-off, family activities can be a great way to burn calories and bond with loved ones.\n\n6. **Active Holiday Traditions:** Incorporate active elements into your holiday traditions. Take a walk to admire holiday lights or go ice skating with friends. Embrace activities that keep you moving.\n\n7. **Jump Rope:** Jumping rope is an effective and portable cardio workout. Pack a jump rope in your travel bag and get in a quick workout wherever you are during the holidays.\n\n8. **Online Workouts:** If you can't make it to the gym, consider following online workout videos. There are plenty of cardio workout routines available on platforms like YouTube that you can do from the comfort of your home.\n\n9. **Stair Climbing:** If you have access to stairs, use them for a cardio challenge. Climbing stairs can be a great way to get your heart rate up and improve your lower body strength.\n\n10. **Enjoy the Outdoors:** Make the most of the winter weather by engaging in outdoor activities like sledding, snowshoeing, or cross-country skiing. These activities are not only fun but also provide a great cardiovascular workout.\n\nRemember that staying active during the holidays can help you manage stress and maintain your fitness goals. Incorporate these cardio challenges into your festive season, and you'll find that you can enjoy the holiday spirit while keeping your fitness on track.",
      },
    },
    trainers:
    {
        "fbda6329-17b6-4346-abdf-1a3b83f6a73f": {
            _id: "fbda6329-17b6-4346-abdf-1a3b83f6a73f",
            name: "Michael Smith",
            age: 29,
            courses: ["Private Fitness", "Nutrition"],
            _createdOn: 1699372800000,
            _ownerId: "35c62d76-8152-4626-8712-eeb96381bea8",
            description: "Meet Michael Smith, a dynamic fitness and nutrition expert. With a burning passion for personal well-being, he offers specialized courses in private fitness and nutrition. His extensive knowledge and dedication make him the ideal mentor for anyone looking to embark on a journey towards a healthier and fitter life. Michael's private fitness program is customized to your individual needs and goals, whether you're aiming to lose weight, build muscle, or improve overall fitness. Complementing this, his nutrition course equips you with the tools to make informed dietary choices. Join Michael's courses, and let his expertise guide you to a healthier, more vibrant you."
          },
          "1d87b5c8-2601-46bb-bfca-15179c7b7501": {
            _id: "1d87b5c8-2601-46bb-bfca-15179c7b7501",
            name: "Simone Parker",
            age: 32,
            courses: ["Yoga", "Pilates"],
            _createdOn: 1699372800000,
            _ownerId: "847ec027-f659-4086-8032-5173e2f9c93a",
            description: "This is Simone Parker, a dedicated health and fitness instructor. Simone's passion lies in the practice and teaching of yoga and Pilates, two disciplines that promote physical and mental well-being. With a deep understanding of the mind-body connection, Simone has honed her expertise to provide transformative experiences for her students. In her yoga and Pilates classes, you'll discover a welcoming environment that nurtures not only your physical strength but also your inner peace. Simone's teaching style is a perfect blend of mindfulness, technique, and adaptability, making her courses ideal for individuals of all levels. Join Simone on a journey of self-discovery and holistic well-being."
          },
          "d7d6859c-291e-4cf1-a7dc-c8db85a28cd6": {
            _id: "d7d6859c-291e-4cf1-a7dc-c8db85a28cd6",
            name: "William James",
            age: 36,
            courses: ["Weight Loss", "Swimming"],
            _createdOn: 1699372800000,
            _ownerId: "c31fab6a-5a69-43fa-979c-87c62cb191dd",
            description: "Introducing William James, a fitness expert and motivator. William's passion revolves around helping individuals achieve their weight loss goals and experience the exhilaration of spinning. With years of experience in the fitness industry, William has honed his knowledge and skills to provide personalized and effective weight loss programs. In his high-energy spinning classes, you'll find an atmosphere filled with enthusiasm and invigorating music. William's teaching approach is all about empowerment, guiding you on your fitness journey, and ensuring that every step taken leads to success. Join William and embark on a path to a healthier, fitter, and more energetic you."
          }
    }
  };
  var rules$1 = {
    users: {
      ".create": false,
      ".read": ["Owner"],
      ".update": false,
      ".delete": false,
    },
  };
  var settings = {
    identity: identity,
    protectedData: protectedData,
    seedData: seedData,
    rules: rules$1,
  };

  const plugins = [
    storage(settings),
    auth(settings),
    util$2(),
    rules(settings),
  ];

  const server = http__default["default"].createServer(
    requestHandler(plugins, services)
  );

  const port = 3030;
  server.listen(port);
  console.log(
    `Server started on port ${port}. You can make requests to http://localhost:${port}/`
  );
  console.log(`Admin panel located at http://localhost:${port}/admin`);

  var softuniPracticeServer = {};

  return softuniPracticeServer;
});
