export class User {
  constructor(
    public firstname: string,
    public lastname: string,
    public email: string,
    public drinkPreference: string,
    public hobbies?: string[]
  ) {
    /*const user = new User(
      'James',
      'Smith',
      'james@james.com',
      'jus d\'orange',
      ['football','lecture']
    );*/
  }
}


