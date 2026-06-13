import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Tara Ivosevic',
        email: 'TaraAdmin@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Nina Atanaskovic',
        email: 'nina@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
    {
        name: 'Vuk Milojevic',
        email: 'vuk@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
];

export default users;