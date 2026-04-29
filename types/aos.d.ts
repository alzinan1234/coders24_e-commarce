declare module 'aos' {
  interface AosOptions {
    duration?: number;
    delay?: number;
    once?: boolean;
    offset?: number;
    easing?: string;
  }
  const AOS: {
    init(options?: AosOptions): void;
    refresh(): void;
    refreshHard(): void;
  };
  export default AOS;
}
declare module 'aos/dist/aos.css';
