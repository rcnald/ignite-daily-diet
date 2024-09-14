export function getFollowsDietStreak(
  dishes: {
    id: string
    name: string
    description?: string
    created_at: string
    follows_diet: boolean
    user_id: string
  }[],
) {
  let bestFollowingDietSequence = 0
  let currentFollowingDietSequence: number = 0
  let previousDish: {
    id: string
    name: string
    description?: string
    created_at: string
    follows_diet: boolean
    user_id: string
  }

  dishes.forEach((dish) => {
    previousDish = dish

    if (dish.follows_diet && previousDish.follows_diet) {
      currentFollowingDietSequence += 1
    } else {
      currentFollowingDietSequence = 0
    }

    if (currentFollowingDietSequence > bestFollowingDietSequence) {
      bestFollowingDietSequence = currentFollowingDietSequence
    }
  })

  return bestFollowingDietSequence
}
