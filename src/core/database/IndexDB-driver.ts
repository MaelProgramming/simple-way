import { DatabaseDriver, QueryResult } from "./Database";

export class IndexedDBDriver implements DatabaseDriver {
  private dbName: string;
  private version: number;
  private db?: IDBDatabase;
  private stores: string[];

  constructor(dbName: string, version = 1, stores: string[] = []) {
    this.dbName = dbName;
    this.version = version;
    this.stores = stores;
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        this.stores.forEach((store) => {
          if (!db.objectStoreNames.contains(store)) {
            db.createObjectStore(store, { keyPath: "id" });
          }
        });
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onerror = () => reject(request.error);
    });
  }

  disconnect(): Promise<void> {
    return new Promise((resolve) => {
      if (this.db) {
        this.db.close();
        this.db = undefined;
      }
      resolve();
    });
  }

  private getStore(storeName: string, mode: IDBTransactionMode = "readonly"): IDBObjectStore {
    if (!this.db) throw new Error("Database not connected");
    const tx = this.db.transaction(storeName, mode);
    return tx.objectStore(storeName);
  }

  async get<T>(table: string, id: string): Promise<QueryResult<T>> {
    try {
      const store = this.getStore(table);
      const request = store.get(id);

      return await new Promise<QueryResult<T>>((resolve) => {
        request.onsuccess = () => resolve({ success: true, data: request.result });
        request.onerror = () => resolve({ success: false, error: request.error?.message });
      });
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }

  async getAll<T>(table: string): Promise<QueryResult<T[]>> {
    try {
      const store = this.getStore(table);
      const request = store.getAll();

      return await new Promise<QueryResult<T[]>>((resolve) => {
        request.onsuccess = () => resolve({ success: true, data: request.result });
        request.onerror = () => resolve({ success: false, error: request.error?.message });
      });
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }

  async insert<T extends { id?: string }>(table: string, data: T): Promise<QueryResult<T>> {
    try {
      const store = this.getStore(table, "readwrite");

      // Génère un id unique si inexistant
      const id = data.id ?? crypto.randomUUID();
      const record = { ...data, id };

      const request = store.add(record);

      return await new Promise<QueryResult<T>>((resolve) => {
        request.onsuccess = () => resolve({ success: true, data: record });
        request.onerror = () => resolve({ success: false, error: request.error?.message });
      });
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }

  async update<T>(table: string, id: string, data: Partial<T>): Promise<QueryResult<T>> {
    try {
      const existing = await this.get<T>(table, id);
      if (!existing.success || !existing.data)
        return { success: false, error: "Item not found" };

      const updated = { ...existing.data, ...data, id };
      const store = this.getStore(table, "readwrite");
      const request = store.put(updated);

      return await new Promise<QueryResult<T>>((resolve) => {
        request.onsuccess = () => resolve({ success: true, data: updated });
        request.onerror = () => resolve({ success: false, error: request.error?.message });
      });
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }

  async delete(table: string, id: string): Promise<QueryResult> {
    try {
      const store = this.getStore(table, "readwrite");
      const request = store.delete(id);

      return await new Promise<QueryResult>((resolve) => {
        request.onsuccess = () => resolve({ success: true });
        request.onerror = () => resolve({ success: false, error: request.error?.message });
      });
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }
}
