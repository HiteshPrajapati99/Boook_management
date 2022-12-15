const BooksReducer = (state, action) => {
  // if else statemt use
  // if(action.type === "Loding_Data") {
  //     return {
  //         ...state,
  //         isLoding : true ,
  //     }
  // }

  // use js swetch function "is like if else"

  switch (action.type) {
    case "Loding_Data":
      return {
        ...state,
        isLoding: true,
      };

    case "Data_Added_Api":
      return {
        ...state,
        isLoding: false,
        book: action.payload,
      };

    case "Api_Data_Error":
      return {
        ...state,
        isLoding: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default BooksReducer;
