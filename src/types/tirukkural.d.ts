// Type definitions for the Tirukkural JSON data
declare module '*/tirukkural.json' {
  interface Kural {
    KuralID: number;
    VerseTamil: string[];
    VerseEnglish: string[];
  }

  const data: Kural[];
  export default data;
}
