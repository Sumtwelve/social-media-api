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
    "555",
    "777",
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

module.exports = {
    /**
     * Pick a random item from a non-empty array.
     * @param {Array} arr The array to pick from.
     * @returns {any} A random element from the given array.
     */
    getRandomArrItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    /**
     * Returns a random full name assembled from a predefined sample set.
     * @returns {String} A two-word full name.
     */
    getRandomName() {
        return `${getRandomArrItem(usernames)} ${getRandomArrItem(usernames)}`;
    },

    /**
     * Assembles some predefined fragments into a random full email address.
     * @returns {String} A full Gmail address.
     */
    getRandomEmail() {
        return `${getRandomArrItem(emailFragments)}-${getRandomArrItem(emailFragments)}@gmail.com`
    },

    /**
     * Assembles an array of thoughts picked randomly from a predefined sample set.
     * @param {Number} num The number of random thoughts to gather.
     * @returns {Array<String>} An array of thought bodies (does not return a complete Schema-complying Thought object).
     */
    getRandomThoughts(num) {
        const results = [];
        for (let i = 0; i < num; i++) {
            results.push({
                thoughtText: getRandomArrItem(thoughts),
                username: getRandomArrItem(usernames)
            });
        }
        return results;
    },

    /**
     * Assembles an array of reaction bodies picked randomly form a predefined sample set.
     * @param {Number} num The number of random reactions to gather.
     * @returns {Array<String>} An array of strings to iteratively inject when seeding many reactions into the database.
     */
    getRandomReactions(num) {
        const results = [];
        for (let i = 0; i < num; i++) {
            results.push(getRandomArrItem(reactions));
        }
        return results;
    }
};