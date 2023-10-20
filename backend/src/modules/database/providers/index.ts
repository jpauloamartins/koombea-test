export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const postgresConfig = await require('./postgresConfig');

      return postgresConfig.default.initialize();
    },
  },
];
