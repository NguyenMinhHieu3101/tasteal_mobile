import { useCallback, useEffect, useState } from 'react';
import { useSpinner } from '../../hooks';
import { removeDiacritics } from '../../utils/string';
import {
  RecipeSearchReq,
  initRecipeSearchReq,
} from '../models/dtos/Request/RecipeSearchReq/RecipeSearchReq';
import { RecipeEntity } from '../models/entities/RecipeEntity/RecipeEntity';
import { RecipeService } from '../services/recipeService';

type Keyword = {
  keyword: string;
  value: boolean;
};

type SortType = {
  type: 'name' | 'rating' | 'totalTime' | 'calories' | 'serving_size';
  sort: 'asc' | 'desc';
};

const useRecipeSearch = (viewportItemAmount: number = 12) => {
  //#region Hooks

  const spin = useSpinner();

  //#endregion
  //#region Recipes

  const [recipes, setRecipes] = useState<RecipeEntity[]>([]);
  const [page, setPage] = useState(1);
  const [end, setEnd] = useState(false);

  // Init data
  useEffect(() => {
    let active = true;

    spin(true);
    (async function () {
      try {
        const data = await RecipeService.GetAllRecipes(
          viewportItemAmount,
          page
        );
        const keywordEntities: string[] = await RecipeService.GetKeyWords();
        if (!active) return;

        const keywords = keywordEntities
          .map((item) => {
            return {
              keyword: item,
              value: false,
            };
          })
          .slice(0, 12);

        setKeywords(keywords);
        setRecipes(data.filter((item) => item && !item.is_private));
      } catch (error) {
        console.log(error);
      } finally {
        spin(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);
  //#endregion
  //#region Search
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange = useCallback((newSearchTerm: string) => {
    if (newSearchTerm == '') {
      setEnd(false);
    } else setEnd(true);
    setSearchTerm(newSearchTerm);
  }, []);

  const recipeFilterPredicate = useCallback(
    (item?: RecipeEntity) => {
      if (!item) return false;

      const value = searchTerm;
      if (!value || value == '') {
        return true;
      }

      const str = JSON.stringify([
        item?.name,
        item?.rating,
        item?.totalTime,
        item?.serving_size,
        item?.introduction,
        item?.author_note,
        item?.account?.name,
        item?.ingredients?.map((i) => i.name),
        item?.direction?.map((i) => i.direction),
      ]);

      return removeDiacritics(str.toLocaleLowerCase()).includes(
        removeDiacritics(value.toLocaleLowerCase())
      );
    },
    [searchTerm]
  );

  //#endregion
  //#region Filter
  const [searchReq, setSearchReq] =
    useState<RecipeSearchReq>(initRecipeSearchReq);

  function handleSearchReqChange<T extends keyof RecipeSearchReq>(
    type: T,
    value: RecipeSearchReq[T]
  ) {
    const newFilter = {
      ...searchReq,
      [type]: value,
    };

    setSearchReq(newFilter);
  }

  useEffect(() => {
    let active = true;

    (async function fetchData() {
      spin(true);
      setSearchTerm('');
      const newData = await RecipeService.SearchRecipes({
        ...searchReq,
        page: 1,
        pageSize: viewportItemAmount,
      });

      if (!active) return;

      setPage(1);
      setRecipes(newData);
      if (newData.length < viewportItemAmount) setEnd(true);
      else setEnd(false);
      spin(false);
    })();

    return () => {
      active = false;
    };
  }, [searchReq]);

  function resetSearchReq() {
    setSearchReq(initRecipeSearchReq);
    setSearchTerm('');
    setSortType(null);
    setKeywords((prev) =>
      prev.map((item) => {
        return {
          ...item,
          value: false,
        };
      })
    );
  }

  //#endregion
  //#region Từ khóa
  const [keywords, setKeywords] = useState<Keyword[]>([]);

  const handleChangeKeyword = (keyword: Keyword) => {
    const newKeywords = [...keywords].map((item) => {
      if (item.keyword === keyword.keyword) {
        return {
          ...item,
          value: !item.value,
        };
      } else {
        return item;
      }
    });
    setKeywords(newKeywords);
    let keyWords: RecipeSearchReq['KeyWords'] = newKeywords
      .map((item) => {
        if (item.value && item.keyword) {
          return item.keyword;
        }
      })
      .filter(Boolean);
    handleSearchReqChange('KeyWords', keyWords.length == 0 ? null : keyWords);
  };

  //#endregion
  //#region Infinite Scroll
  const loadNext = useCallback(async () => {
    if (end) return;
    let nextData: RecipeEntity[] = [];
    nextData = await RecipeService.SearchRecipes({
      ...searchReq,
      page: page + 1,
      pageSize: viewportItemAmount,
    });

    setPage((prev) => prev + 1);
    if (recipes) {
      setRecipes((prev) => [...prev, ...nextData]);
    } else {
      setRecipes(nextData);
    }
    if (nextData.length < viewportItemAmount) setEnd(true);
  }, [recipes]);
  //#endregion
  //#region Sort
  const [sortType, setSortType] = useState<SortType | null>(null);
  function handleSort(sortType: SortType | null) {
    setSortType(sortType);

    const { type, sort } = sortType ? sortType : { type: 'name', sort: 'asc' };

    const newRecipes = [...recipes].sort((a, b) => {
      if (Object.keys(a).includes(type) && Object.keys(b).includes(type)) {
        if (a[type] == null && b[type] == null) {
          return 0;
        }
        if (a[type] < b[type]) {
          return sort == 'asc' ? -1 : 1;
        }
        if (a[type] > b[type]) {
          return sort == 'asc' ? 1 : -1;
        }
      }
      return 0;
    });
    setRecipes(newRecipes);
  }

  //#endregion

  return {
    recipes:
      recipes && recipes.length > 0
        ? recipes.filter(recipeFilterPredicate)
        : [],
    searchReq,
    resetSearchReq,
    handleSearchReqChange,
    searchTerm,
    handleSearchTermChange,
    recipeFilterPredicate,
    keywords,
    handleChangeKeyword,
    loadNext,
    end,
    sortType,
    handleSort,
  };
};

export { useRecipeSearch };
