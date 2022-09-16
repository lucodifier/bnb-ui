/// <reference types="vite/client" />
declare module 'react/jsx-runtime' {
    const content: string;
    export default content; 
  }
  declare module "*.svg" {
    const content: any;
    export default content;
  }
