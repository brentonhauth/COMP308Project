export default {
  /**
   * @template T
   * @param {Array<T>} array
   * @param {(t:T,i?:number)=>boolean} pred
   */
  remove(array, pred) {
    if (!array) return [];
    const index = array.findIndex(pred);
    if (index !== -1) {
      array.splice(index, 1);
    }
    return array;
  }
};