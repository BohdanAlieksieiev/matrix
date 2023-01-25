export const generationDataTable = (rows: number, columns: number) => {
    const emptyMatrix = new Array(rows).fill(new Array(columns).fill(0));
    return emptyMatrix.map((row) =>
      row.map(() => {
        const maxNumberForAmount = Math.ceil(Math.sqrt(rows * columns)); 
        const amount = Math.ceil(Math.random() * maxNumberForAmount);
        return {
          id: Date.now() + Math.ceil(Math.random() * 999999),
          amount: amount,
        };
      })
    );
  };