(async () => {

  const openai = require('./openai')

  const knex = require('./knexfile')

  const movies = await knex('movies').select()

  for (let i = 0; i < movies.length; i++) {

    const movie = movies[i]

    // Can re-run if the script fails
    if (movie.movie_story_type && movie.movie_story_type_explanation) {
      continue
    }

    const typeOfStoryResponse = await openai.getJSONResponse(`
      <TypesOfStories>
        1. Monster in the House
        Monster in the house stories take us to our most primal instincts: Do not get eaten. The story usually centers around a protagonist who is trapped with a monster in a defined setting. The setting or ‘house’ can be a town, house, room, really anything as long as it is inescapable. The monster is typically a metaphor for the consequences brought upon by sin. An act of sin invites the monster into the setting and it is only after the sin is acknowledged and atoned for that the monster can be destroyed.

        2. Golden Fleece
        Golden Fleece is a journey or quest story. Golden Fleece stories usually have a prize or goal that the main character needs to obtain or achieve. This goal or prize is time sensitive and the protagonist often assembles a team along the way to achieve this goal or obtain the prize. The joy of the Golden Fleece story is in the journey not in reaching the destination.

        3. Out of the Bottle
        Out of the bottle stories are parables about people appreciating what they have and making the necessary changes to maintain the things you treasure. In an Out of the Bottle story you have a character who is either really successful or struggling with their situation. A wish is expressed and a spell or plot device is introduced that takes the protagonist and places them in circumstances that are the antithesis of their current existence. The audience enjoys witnessing the protagonist navigate the new world and eventually the protagonist realizes that the skills developed in their previous situation are what make them special. The lesson is then learned and the protagonist returns to their previous existence armed with new knowledge and confidence for the road ahead.

        4. Buddy Love
        Buddy love stories are stories about relationships. These are stories about human beings finding love and purpose in the beings we interact with. Some stories can be about friendship, others romantic love, and some about pets or even robots. In a buddy love story you have a protagonist who is incomplete yet does not realize something is missing in their life. A counterpart is introduced who is the antithesis of the protagonist and carries the missing component that will make the protagonist complete. The story progresses and the protagonist and counterpart clash in style, approach, and perspective yet slowly discover each others strengths. A complication is introduced that tears the team apart and through this complication the team is reformed and each borrows lessons learned from the other.

        5. Whydunit
        A Whydunit is a detective story or a mystery. A character begins solving a problem that gets more dangerous the more they learn and the closer they come to uncovering the secret or whatever is hidden. The protagonist does not need to be a detective, but they will still perform the role of a detective in that they will collect and decipher clues and use their knowledge to solve the mystery. The dark turn is the point in the story where the hunt for truth becomes dangerous for the protagonist and the protagonist is no longer safe whether or not the truth is revealed. It is called a whydunit because the most interesting element of the story is motive rather than the identity of the perpetrator. The audience does not care about who did the crime as much as why they did it.

        6. Dude With a Problem
        Dude or rather Human with a problem stories are when a protagonist is forced to confront a conflict by happenstance. The protagonist was attending their daily activities and are forced to respond to a sudden event that has now caused a life or death situation.

        7. Institutionalized
        Institutionalized stories are centered around an individual's battle with a society, group, or institution. There is often a group that the protagonist belongs to and through an event or series of events the character is forced into a world that has them make a choice to confront either an opposite society/institution/group or their own society/institution/group. Finally, a sacrifice must be made in order to secure the new order established after the conflict. Sometimes the sacrifice is a member of the group, sometimes it is a sacred object or ideal, and sometimes it is the protagonist themselves.

        8. Fool Triumphant
        The fool triumphant story is about a protagonist who is unaware of any greatness they may possess. The fool enters a world, establishment, or institution and due to the fools lack of awareness causes conflict. The world, establishment, or institution tries with all its might to destroy the fool, but the fool narrowly escapes each attempt through luck and happenstance. Eventually, the fool becomes aware of the establishment and through the trials of the story is able to mutate into a hero and bring down the establishment to create positive change.

        9. Rights of Passage
        A rights of passage story is usually centered around internal conflict. The protagonist is confronted with a life problem that upends their normal existence and sends them on a path of self discovery. The protagonist spends much of the story dealing with and confronting the problem in counter productive and damaging ways that leave them weaker than when the conflict was introduced. Finally, the protagonist is able to accept their situation and only through acceptance can a new life or existence begin.

        10. Super Hero
        The Super Hero story is not always about individuals with magical abilities, but rather focuses on the burden of possessing talents. The protagonist is endowed with a special power of some sort, this could be public speaking, leadership, or some kind of unique gift or talent. This talent is both a blessing and a curse because it is a barrier between the hero and the society in which the hero resides. A Nemesis is introduced who is ruthless in the pursuit of their own goal and knows that the hero is a threat. The nemesis will often offer a position of power or status within the society. The hero must make a choice to accept the power as a blessing and willingly accept the burden of the curse, to defeat the Nemesis.
      </TypesOfStories>

      <Instruction>
        Based on the above "types of stories" from Blake Snyder, what type of story is the film "${movie.movie_title}"? Pick only 1 based on best fit. Return in JSON format:

        {
          story_type: string
          explanation: string
        }
      </Instruction>
    `)

    const storyType = typeOfStoryResponse.story_type
    const storyTypeExplanation = typeOfStoryResponse.explanation

    await knex('movies').where('movie_id', movie.movie_id).update({
      movie_story_type: storyType,
      movie_story_type_explanation: storyTypeExplanation
    })

  }

  process.exit()

})()
