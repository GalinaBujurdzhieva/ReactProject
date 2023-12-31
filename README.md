**Sport Fit** is a fitness website with public and private part, as well as admin area.

1. The **public part** is available without authentication and include the following pages: 

&emsp;**Home** - a brief description of fitness best proposals, link to About page, users' testimonials, courses and latest blogs;

&emsp;**About us** - more detailed description of the fitness, trainers info and link to Register page;

&emsp;**Classes&Services** - additional information for the courses offered, timetable of the courses with trainers, where you can take a look at all courses of the week or choose a specific one and be aware of its timetable and again link to Register page;

&emsp;**Blog** - latest 3 blogs with link to all blogs; 

&emsp;**Contact** - form for inquiries for unregistered users and Google Map; 

&emsp;**Register and Login**.

2. The **private area** is accessible after successful login. Every logged-in user can add, edit and delete comments about the fitness. He also can vote (like, dislike) for courses (only one time for specific course).

3. The **admin** has special rights to create, edit and delete blogs, info about trainers and testimonials.

**This project is built with:**

&emsp;**Front-End - ReactJS**.

&emsp;**Server - SoftUni Practice Server**.

It has seeded data about Users, Blogs, Trainers, Testimonials, Courses and Best Proposals. In addition and for better user experience the website uses Toastr notifications.

In order to start this project you have to do the following: 
1. Clone the repo

2. In directory "/client", open command terminal and run:

 ```sh
   npm install
   ```
 ```sh
   npm install react-toastify
   ```
 
 ```sh
   npm run dev
   ```

3. In directory "/server", open command terminal and run:

 ```sh
   node server.js
   ```

**You can log in with the following users:**

| Username        | Email          | Password |
| --------------- |:--------------:| --------:|
| Admin           | admin@abv.bg   | admin    |
| Peter           | peter@abv.bg   |   123456 |
|George           | george@abv.bg  |   123456 |
