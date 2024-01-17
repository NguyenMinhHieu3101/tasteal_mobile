import { ApiEndPoint } from '../lib/url';
import { CookBookEntity } from '../models/entities/CookBookEntity/CookBookEntity';
import { CookBook_RecipeEntity } from '../models/entities/CookBook_RecipeEntity/CookBook_RecipeEntity';

export class CookbookRecipeService {
  public static async GetCookBookRecipeByCookBookId(
    cookBookId: CookBookEntity['id']
  ): Promise<CookBook_RecipeEntity[]> {
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };
    return await fetch(
      ApiEndPoint.GetCookBookRecipeByCookBookId(cookBookId),
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error('Lỗi:', error);
        throw error;
      });
  }

  public static async DeleteCookBookRecipe(
    id: CookBook_RecipeEntity['id']
  ): Promise<boolean> {
    const requestOptions: RequestInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };
    return await fetch(ApiEndPoint.DeleteCookBookRecipe(id), requestOptions)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error('Lỗi:', error);
        return '';
      });
  }
}
