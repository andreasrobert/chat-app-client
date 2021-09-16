//Here we export the function process with the defined parameters and define action object PROCESS,
//which will return the same parameters as the payload.
export const process = (encrypt:any, text:any, cypher:any) => {
    return {
      type: "PROCESS",
      payload: {
        encrypt,
        text,
        cypher,
      },
    };
  };