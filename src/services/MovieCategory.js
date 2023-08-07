// import axios from "axios";
import categories from '@/minidb/categories.json'

const getCategoriesFromFile = () => {
  return categories;
}

export const Categories = () => {
  return getCategoriesFromFile();
};
