const trainerNames = {
    'Weight Loss': "William James",
    'Yoga': "Simone Parker",
    'Swimming': "William James",
    'Fitness': "Michael Smith",
    'Nutrition': "Michael Smith",
    'Pilates': "Simone Parker",
}

export const getTrainerName =(courseName) => {
    return trainerNames[courseName];
}