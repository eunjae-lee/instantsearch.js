interface ShowMoreState {
  isShowingMore: boolean;
  limit: number | null;
  showMoreLimit: number | null;
  showMore: boolean;
}

interface ShowMore {
  /**
   * Toggles the widget to show more or less values.
   */
  toggleShowMore(): void;
  /**
   * Sets the listener function to call whenever `toggleShowMore` is called.
   * It returns a function to unsubscribe the listener.
   */
  setToggleShowMore(listener: Listener): () => void;
  /**
   * Returns whether the widget is currently showing more values.
   */
  getIsShowingMore(): boolean;
  /**
   * Returns the current facets limit (`limit` or `showMoreLimit`)
   */
  getCurrentLimit(): number | null;
  /**
   * Returns the number of facets to retrieve from the API.
   */
  getMaxValuesPerFacet(): number | null;
}

type CreateShowMore = (initialState?: Partial<ShowMoreState>) => ShowMore;
type Listener = () => void;

export const createShowMore: CreateShowMore = initialState => {
  let onToggle: Listener | null = null;

  const state: ShowMoreState = {
    isShowingMore: false,
    limit: null,
    showMoreLimit: null,
    showMore: false,
    ...initialState,
  };

  function toggleShowMore() {
    state.isShowingMore = !state.isShowingMore;

    if (onToggle) {
      onToggle();
    }
  }

  function setToggleShowMore(listener: Listener) {
    onToggle = listener;

    return () => {
      onToggle = null;
    };
  }

  // Get always a fresh state with values computed via functions.
  const enhancerState = {
    toggleShowMore: () => toggleShowMore(),
    isShowingMore: () => state.isShowingMore,
    getCurrentLimit: () =>
      state.isShowingMore ? state.showMoreLimit : state.limit,
    getMaxValuesPerFacet: () =>
      state.showMore ? state.showMoreLimit : state.limit,
  };

  return {
    toggleShowMore: enhancerState.toggleShowMore,
    setToggleShowMore,
    getIsShowingMore: enhancerState.isShowingMore,
    getCurrentLimit: enhancerState.getCurrentLimit,
    getMaxValuesPerFacet: enhancerState.getMaxValuesPerFacet,
  };
};
