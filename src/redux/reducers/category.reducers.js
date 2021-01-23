import { categoryConstants } from "../actions/constants";

const initialState = {
  fetchData: [],
  postData: null,
  fetchLoading: false,
  postLoading: false,
  fetchSuccessful: false,
  postSuccessful: false,
  fetchError: null,
  postError: null,
};

// updateCategoryList
const updateCategoryList = (oldCatList, newCategory) => {
  if (!newCategory.parentId) {
    return [...oldCatList, newCategory];
  }

  let updatedCatList = [];

  for (let cat of oldCatList) {
    if (cat._id == newCategory.parentId) {
      updatedCatList.push({
        ...cat,
        children:
          cat.children?.length > 0
            ? updateCategoryList([...cat.children, newCategory], newCategory)
            : [],
      });
    } else {
      updatedCatList.push({
        ...cat,
        children:
          cat.children?.length > 0
            ? updateCategoryList(cat.children, newCategory)
            : [],
      });
    }
  }

  return updatedCatList;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case categoryConstants.GET_ALL_CAT_REQUEST:
      state = {
        ...state,
        fetchLoading: true,
        fetchError: null,
      };
      break;

    case categoryConstants.GET_ALL_CAT_SUCCESS:
      state = {
        ...state,
        fetchData: action.payload.data,
        fetchLoading: false,
        fetchSuccessful: true,
        fetchError: null,
      };
      break;

    case categoryConstants.GET_ALL_CAT_FAILURE:
      state = {
        ...state,
        fetchData: [],
        fetchLoading: false,
        fetchSuccessful: false,
        fetchError: action.payload.error,
      };
      break;

    case categoryConstants.ADD_CATEGORY_REQUEST:
      state = {
        ...state,
        postLoading: true,
        postError: null,
      };
      break;

    case categoryConstants.ADD_CATEGORY_SUCCESS:
      state = {
        ...state,
        postData: action.payload.data,
        fetchData: updateCategoryList(state.fetchData, action.payload.data),
        postLoading: false,
        postSuccessful: true,
        postError: null,
      };
      break;

    case categoryConstants.ADD_CATEGORY_FAILURE:
      state = {
        ...state,
        postData: null,
        postLoading: false,
        postSuccessful: false,
        postError: action.payload.error,
      };
      break;

    default:
      break;
  }

  return state;
};
