// Get rating based on metacritic score
export const getRating = (metacritic) => {
  let rating;
  let ratingClass;

  switch (true) {
    case metacritic >= 1 && metacritic <= 10:
      rating = "Gutter Trash";
      ratingClass = "gutter-trash";
      break;
    case metacritic > 10 && metacritic <= 20:
      rating = "Terrible";
      ratingClass = "terrible";
      break;
    case metacritic > 20 && metacritic <= 30:
      rating = "Utterly Bad";
      ratingClass = "utterly-bad";
      break;
    case metacritic > 30 && metacritic <= 40:
      rating = "Quite Disappointing";
      ratingClass = "quite-disappointing";
      break;
    case metacritic > 40 && metacritic <= 50:
      rating = "Below Average Decency";
      ratingClass = "below-average";
      break;
    case metacritic > 50 && metacritic <= 60:
      rating = "Average at Best";
      ratingClass = "average";
      break;
    case metacritic > 60 && metacritic <= 70:
      rating = "Quite Decent";
      ratingClass = "quite-decent";
      break;
    case metacritic > 70 && metacritic <= 80:
      rating = "Pretty Good";
      ratingClass = "pretty-good";
      break;
    case metacritic > 80 && metacritic <= 90:
      rating = "Awesomesauce";
      ratingClass = "awesomesauce";
      break;
    case metacritic > 90 && metacritic <= 100:
      rating = "Glorious Masterpiece!";
      ratingClass = "masterpiece";
      break;
    default:
      rating = "N/A";
      ratingClass = "default";
  }

  return { rating, ratingClass };
};

// Filter games with cheapest price
export const filteredGames = (games) => games.filter(
    (game) =>
      (game.cheapest && game.metacritic) || !game.cheapest || !game.metacritic
  )
  .sort((a, b) => {
    const ratingA = a.metacritic;
    const ratingB = b.metacritic;

    // Check if both games have a price, if not, prioritize the one with a price.
    if (!a.cheapest && b.cheapest) {
      return 1;
    } else if (a.cheapest && !b.cheapest) {
      return -1;
    }

    // If both have a price or neither have a price, sort by metacritic rating.
    return ratingB - ratingA;
  });
