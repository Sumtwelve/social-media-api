const { Types } = require('mongoose');

const usernames = [
    "Andrea",
    "Hasgow",
    "Bobert",
    "Schindler",
    "Cassandra",
    "Roberts",
    "Daniel",
    "Frogun",
    "Eric",
    "Numen",
    "Frederick",
    "Potsmith",
    "Gerald",
    "Hastover",
    "Henrietta",
    "Caesar",
    "Illiana",
    "Dupont",
    "Julius",
    "Moreno",
    "Kameron",
    "Ostenhauer",
    "Lily",
    "Nelson",
    "Mildred",
    "Roper",
    "Neil",
    "Harris",
    "Ophelia",
    "Spinnet",
    "Paula",
    "Dean",
    "Quincy",
    "Shillingsworth",
    "Russell",
    "Terou",
    "Sofia",
    "Mafatoa",
    "Terrence",
    "Justice",
    "Ulysses",
    "Garcia",
    "Veronica",
    "Stewart",
    "William",
    "Doblitz",
    "Xander",
    "Lee",
    "Yu",
    "Tao",
    "Ziang",
    "Xi"
];

// These fragments will be assembled into full email addresses later:
// [fragment]-[fragment]@gmail.com
const emailFragments = [
    "big",
    "little",
    "hamburger",
    "taco",
    "kitty",
    "oatmeal",
    "nascar",
    "rough",
    "pullover",
    "ninja",
    "elbow",
    "monster",
    "zombie",
    "purple",
    "great",
    "x"
];

// Random thoughts that will be added to users
const thoughts = [
    "This is a little weird tbh. Why do we need another social media app. And why did I download it.",
    "Let the record stand I am the nicest-smelling person on this app",
    "Let's go!! Just landed my dream job at the cake factory!",
    "Lesson learned: never let your little brother pick the restaurant",
    "i just found some interesting stuff online message me for more details",
    "Sarah just told me Elon Musk was named after a Roald Dahl character?? That doesn't sound right. Maybe double-check your facts.",
    "I have a secret but I'm not telling you.",
    "So a thought is just like a post right? This app is weird",
    "Feeling very loud today",
    "if u liked this post than your cool",
    "Today's the day boys",
    "Wow! I just realized I can exist on here! What a wonderful app!",
    "How in the world do doctors know anything about MY body??",
    "Sorry I didn't make it mom I was suddenly transported to another dimension this weekend.",
    "if anyone finds my keys can you pls tell me? thanks"
];

const reactions = [
    "Weird post",
    "Have you asked Greg?",
    "Have you asked Melissa?",
    "I think my highly inebriated uncle told me this exact thing last Thanksgiving",
    "Maybe next time bring an umbrella!",
    "Ooo I bet your cakes will be the best! ♥ Grandma",
    "I'm not your mother but I'm very disappointed in you son",
    "Wish Josh was still in town. He'd knock you out for saying that. Man that would be funny.",
    "Louder for the people in the back",
    "This is the part where you delete your account",
    "If you love it that much why don't you marry it?",
    "I found your keys. They were right next to where they weren't",
    "The day that... what?",
    "no thanks",
    "study hard and you can maybe know a few things about lots of stuff",
    "I only posted this comment because I'm bored",
    "Next time I won't hold back.",
    "Have you asked Dorothy?",
    "Have you asked Harry?",
    "I don't remember why I ever decided to read this post",
    "I still think about this sometimes",
    "sure",
    "listen here bucko you talk that trash again and uh, um well i'll...... i forgot what i was gonna say",
    "You're my favorite person in the world for saying that"
];


/**
 * Pick a random item from a non-empty array.
 * @param {Array} arr The array to pick from.
 * @returns {any} A random element from the given array.
 */
function getRandomArrItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
     * Returns any number of reactions picked randomly form a predefined sample set.
     * @param {number} num The number of random reactions to return.
     * @returns {string | string[]} A single string (or an array of strings) to use as the body of the Reaction.
     */
function getRandomReactions(num) {
    if (num > 1) {
        let reactionObjects = [];
        for (let i = 0; i < num; i++) {
            reactionObjects.push(
                {
                    reactionId: new Types.ObjectId(),
                    reactionText: getRandomArrItem(reactions),
                    username: `${getRandomArrItem(usernames)}${getRandomArrItem(usernames)}${Math.floor(Math.random() * 999)}`
                }
            );
        }
        return reactionObjects;
    }
    return getRandomArrItem(reactions);
}

module.exports = {

    /**
     * Creates a specified number of Mongoose ObjectIds.
     * @param {number} num The number of ObjectIds to get back.
     * @returns {Mongoose.Types.ObjectId | Mongoose.Types.ObjectId[]} One ObjectId (or an array of ObjectIds).
     */
    getObjectIds(num) {
        if (num > 1) {
            let objectIds = [];
            for (let i = 0; i < num; i++) {
                objectIds.push(new Types.ObjectId());
            }
            return objectIds;
        }
        return new Types.ObjectId();
    },

    /**
     * Returns a random username.
     * @param {number} num The number of random usernames to return.
     * @returns {string | string[]} One username (or an array of usernames if num > 1).
     */
    getRandomNames(num) {
        if (num > 1) {
            let names = [];
            for (let i = 0; i < num; i++) {
                // example output: 'SofiaHarris597'
                names.push(`${getRandomArrItem(usernames)}${getRandomArrItem(usernames)}${Math.floor(Math.random() * 999)}`);
            }
            return names;
        }
        return `${getRandomArrItem(usernames)}${getRandomArrItem(usernames)}${Math.floor(Math.random() * 999)}`;
    },

    /**
     * Assembles some predefined fragments into a random full email address.
     * @returns {String} A full Gmail address.
     */
    getRandomEmail() {
        // example output: 'great-ninja429@gmail.com'
        return `${getRandomArrItem(emailFragments)}-${getRandomArrItem(emailFragments)}${Math.floor(Math.random() * 999)}@gmail.com`;
    },

    /**
     * Assembles an array of thoughts picked randomly from a predefined sample set.
     * @param {number} numThoughts The number of random thoughts to return.
     * @param {number} numReactions The number of random Reaction texts to generate on the thought.
     * @returns {String | String[]} A single string (or an array of strings if num > 1) to use as the body of the Thought.
     */
    getRandomThoughts(numThoughts, numReactions) {
        if (numThoughts > 1) {
            let thoughtStrings = [];
            for (let i = 0; i < numThoughts; i++) {
                thoughtStrings.push({
                    _id: new Types.ObjectId(),
                    thoughtText: getRandomArrItem(thoughts),
                    username: `${getRandomArrItem(emailFragments)}-${getRandomArrItem(emailFragments)}${Math.floor(Math.random() * 999)}@gmail.com`,
                    reactions: getRandomReactions(numReactions)
                });
            }
            return thoughtStrings;
        }
        return {
            thoughtText: getRandomArrItem(thoughts),
            reactions: getRandomReactions(3)
        }
    }
};