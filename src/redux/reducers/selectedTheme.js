const selectedTheme = (state = {}, action) => {
  switch (action.type) {
    case 'LIGHT':
      return {
        ...state,
        lightTheme: true
      };

      case 'DARK':
      return {
        ...state,
        darkTheme: true
      };
  
    default:
      return state
  }
}

export default selectedTheme;