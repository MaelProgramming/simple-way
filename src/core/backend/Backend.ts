export class Backend {
  private baseUrl: string;

  /**
   * @param baseUrl Base URL of your PHP backend folder, e.g., 'http://localhost/php'
   */
  constructor(baseUrl = 'http://localhost/php') {
    this.baseUrl = baseUrl;
  }

  /**
   * Generic POST request to a PHP script
   */
  private async post<T>(scriptName: string, params: Record<string, any>): Promise<T> {
    const res = await fetch(`${this.baseUrl}/${scriptName}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
    }

    return res.json() as Promise<T>;
  }

  /**
   * Dynamically call any PHP script in the backend folder
   */
  async call<T = any>(scriptName: string, params?: Record<string, any>): Promise<T> {
    if (!scriptName.endsWith('.php')) {
      scriptName += '.php';
    }
    return this.post<T>(scriptName, params || {});
  }
}
