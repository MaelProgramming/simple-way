// src/core/Database.ts
export interface QueryResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface DatabaseDriver {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  get<T>(table: string, id: string): Promise<QueryResult<T>>;
  getAll<T>(table: string): Promise<QueryResult<T[]>>;
  // <-- ajouter la contrainte ici
  insert<T extends { id?: string }>(table: string, data: T): Promise<QueryResult<T>>;
  update<T>(table: string, id: string, data: Partial<T>): Promise<QueryResult<T>>;
  delete(table: string, id: string): Promise<QueryResult>;
}

export class Database {
  private driver: DatabaseDriver;

  constructor(driver: DatabaseDriver) {
    this.driver = driver;
  }

  async connect() {
    return this.driver.connect();
  }

  async disconnect() {
    return this.driver.disconnect();
  }

  async get<T>(table: string, id: string) {
    return this.driver.get<T>(table, id);
  }

  async getAll<T>(table: string) {
    return this.driver.getAll<T>(table);
  }

  async insert<T extends { id?: string }>(table: string, data: T) {
  return this.driver.insert<T>(table, data);
}

  async update<T>(table: string, id: string, data: Partial<T>) {
    return this.driver.update<T>(table, id, data);
  }

  async delete(table: string, id: string) {
    return this.driver.delete(table, id);
  }
}
