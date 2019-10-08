// const members = [
//     {
//         id: 1,
//         name: 'John Doe',
//         email: 'john@gmail.com',
//         status: 'active'
//       },
//       {
//         id: 2,
//         name: 'Bob Williams',
//         email: 'bob@gmail.com',
//         status: 'inactive'
//       },
//       {
//         id: 3,
//         name: 'Shannon Jackson',
//         email: 'shannon@gmail.com',
//         status: 'active'
//       }
// ];

const members = [
  {
      id: 1,
      name: 'L Tower',
      email: 'john@gmail.com',
      code : 'abc123',
      status: 'active',
      notices: {
        id: 1,
        text: 'Welcome to L Tower',
        img: 'images/icon1.png',
        startDate:'12/02/19',
        endDate:'19/03/19',
        createdOn:'11/02/19',
        modified:'12/03/19',
        status: 1,
      }
    },
    {
      id: 2,
      name: 'Five Condo',
      email: 'bob@gmail.com',
      code : 'xyz456',
      status: 'inactive',
      notices: {
        id: 1,
        text: 'Welcome to Five Condo',
        img: 'images/icon2.png',
        startDate:'12/02/19',
        endDate:'19/03/19',
        createdOn:'11/12/19',
        status: 1,
      }
    },
    {
      id: 3,
      name: 'Danielle Towers',
      email: 'shannon@gmail.com',
      code : 'lmo098',
      status: 'active',
      notices: {
        id: 1,
        text: 'Welcome to Danielle Towers',
        img: 'images/icon3.png',
        startDate:'12/02/19',
        endDate:'19/03/19',
        createdOn:'11/12/19',
        status: 1,
      }
    }
];

module.exports = members;