// Battle Texts
let battleTexts = [
  {
    text: "{player1} slipped on a banana peel, but tackled {player2} so hard they may never recover from the humiliation!",
  },
  {
    text: "In a brutal pillow fight, {player1} sent {player2} to bed—permanently embarrassed and clearly outclassed!",
  },
  {
    text: "{player1} threw a rubber chicken at {player2}'s face, leaving a mark both on their dignity and their ego.",
  },
  {
    text: "While twirling dramatically, {player1} sent {player2} crashing into the snack table. Guess they won't be invited to any parties soon.",
  },
  {
    text: "{player1} challenged {player2} to a dance-off, and {player2} left in shame, unable to even keep a rhythm.",
  },
  {
    text: "In a fit of rage, {player1} threw a giant marshmallow at {player2}, who now looks as ridiculous as their failed attempt at fighting.",
  },
  {
    text: "{player1} summoned a herd of rubber ducks, and {player2} ran away, unable to deal with anything more cute than themselves.",
  },
  {
    text: "{player1} pressed the self-destruct button, blowing {player2} into confetti—and their reputation with it.",
  },
  {
    text: "{player1} wielded a squeaky toy, and {player2} fled like a coward, unable to handle a single sound.",
  },
  {
    text: "{player1} did a fabulous hair flip, and {player2} got blinded—though not as blinded as they were by their own incompetence.",
  },
  {
    text: "{player1} crushed {player2} in rock-paper-scissors, reminding them they can't even win a child's game.",
  },
  {
    text: "{player1} unleashed a tickle attack so relentless, {player2} was left helpless and defeated, laughing all the way out of the arena.",
  },
  {
    text: "{player1} smashed a pie in {player2}'s face, leaving them as sticky and pathetic as their efforts.",
  },
  {
    text: "With a deafening silence, {player1} made {player2} feel so awkward they left, realizing even words were too much for them.",
  },
  {
    text: "{player1} stared at {player2} until they blinked, signaling the inevitable—{player2} just isn't cut out for competition.",
  },
  {
    text: "{player1} summoned invisible hamsters that {player2} tripped over, proving they can’t even beat what's not there.",
  },
  {
    text: "With a mighty sneeze, {player1} blew {player2} out of the ring—and probably out of any future fights.",
  },
  {
    text: "{player1} showed off their dance moves and, in the process, knocked {player2} straight out of the competition and into obscurity.",
  },
  {
    text: "With pure sarcasm, {player1} verbally destroyed {player2}, leaving them crushed by words they barely understood.",
  },
  {
    text: "{player1} used a Pokémon card as a shield, and {player2} retreated in sheer shame, realizing they'll never catch 'em all.",
  },
  {
    text: "{player2} tried to dab on {player1}, but ended up faceplanting—proving they're as clumsy as they are foolish.",
  },
  {
    text: "{player1} tried a magic trick, but accidentally made {player2} disappear—just like their relevance.",
  },
  {
    text: "{player2} tried to play charades but forgot how to play, just like they forgot how to win anything meaningful.",
  },
  {
    text: "{player1} bombarded {player2} with dad jokes so bad, {player2} gave up out of pure frustration.",
  },
  {
    text: "{player1} sent a text to {player2} mid-fight, distracting them so much they lost focus—and any remaining dignity.",
  },
  {
    text: "{player1} tried to use the Force but sneezed on {player2} instead, grossing them out so much they fled the fight.",
  },
  {
    text: "{player1} sang karaoke so terribly that {player2} ran away, their ears unable to endure another moment.",
  },
  {
    text: "{player2} tried to roast {player1}, but burned themselves instead, walking away defeated by their own words.",
  },
  {
    text: "{player1} dropped a glitter bomb on {player2}, and now they’re so covered in sparkles they might as well give up.",
  },
  {
    text: "{player1} busted out a cringeworthy dance move, and {player2} fainted from sheer embarrassment on sight.",
  },
  {
    text: "{player1} offered {player2} a slice of pineapple pizza, and {player2} walked away, unable to handle the betrayal.",
  },
  {
    text: "{player1} spammed 'laughing emojis' at {player2}, driving them into a deep existential crisis as they questioned their worth.",
  },
  {
    text: "{player1} wore socks with sandals, and {player2} couldn’t cope with the fashion disaster, leaving them humiliated.",
  },
  {
    text: "{player1} opened a bag of chips so loudly that {player2} lost all focus and decided to quit while they were behind.",
  },
  {
    text: "{player1} missed a high-five so badly, {player2} was overcome with second-hand embarrassment and left.",
  },
  {
    text: "{player1} made eye contact with {player2}, who immediately surrendered, knowing they were outmatched in every way.",
  },
  {
    text: "{player1} checked Instagram mid-fight, and {player2} walked away, disappointed by how little they were taken seriously.",
  },
  {
    text: "{player1} started an interpretive dance so confusing that {player2} left, their brain unable to comprehend the horror.",
  },
  {
    text: "{player2} tried parkour but failed miserably, tripping over {player1}'s shoes like an amateur.",
  },
  {
    text: "{player2} challenged {player1} to a thumb war, but lost so quickly they’re probably reconsidering all their life choices now.",
  },
  {
    text: "{player1} unleashed the ultimate cringe-worthy dab, and {player2} ran off before things got worse.",
  },
  {
    text: "{player1} summoned a storm of insults, and {player2} retreated with their pride in tatters.",
  },
  {
    text: "{player1} sent a flurry of passive-aggressive comments, causing {player2} to break down in the middle of the battle.",
  },
  {
    text: "{player1} started a slow clap, and {player2} left, unable to endure the sarcastic applause any longer.",
  },
  {
    text: "{player1} offered {player2} a handshake, but withdrew it last second, leaving {player2} standing awkwardly defeated.",
  },
  {
    text: "{player1} told {player2} their meme game was weak, and {player2} left the arena in disgrace.",
  },
  {
    text: "{player1} corrected {player2}'s grammar mid-fight, and {player2} left the battlefield humiliated by their own ignorance.",
  },
  {
    text: "{player1} started typing, and {player2} left before reading another condescending message.",
  },
  {
    text: "{player1} sent a thumbs-down emoji, and {player2} could not emotionally recover from such a savage burn.",
  },
  {
    text: "{player1} played air guitar, and {player2} fled, unable to handle the rockstar energy.",
  },
  {
    text: "{player1} tried to give {player2} a high-five, but {player2} dodged—right into a wall.",
  },
  {
    text: "{player1} dabbed so hard, {player2} left in embarrassment, questioning why they ever joined this battle.",
  },
  {
    text: "{player1} sent {player2} a TikTok dance challenge, and {player2} fled before they could embarrass themselves further.",
  },
  {
    text: "{player1} threw a Nerf dart at {player2}, and {player2} dramatically pretended to be 'downed,' accepting their loss.",
  },
  {
    text: "{player1} hit {player2} with a dodgeball so hard they’ll be seeing red for weeks.",
  },
  {
    text: "{player1} handed {player2} an Uno reverse card, and {player2} immediately accepted their defeat.",
  },
  {
    text: "{player1} made a sarcastic comment so biting, {player2} had no choice but to walk away with their tail between their legs.",
  },
  {
    text: "{player1} threw an imaginary punch, and {player2} still flinched—what a cowardly move!",
  },
  {
    text: "{player1} challenged {player2} to a staring contest, and {player2} blinked in under a second, confirming their lack of mental fortitude.",
  },
  {
    text: "{player1} started singing a terrible rendition of 'Let It Go,' and {player2} ran for the hills.",
  },
  {
    text: "{player1} sent {player2} a Rickroll, and {player2} left the fight, vowing never to trust anyone again.",
  },
  {
    text: "{player1} released a barrage of dad jokes, and {player2} couldn’t handle the cringe, conceding the match.",
  },
  {
    text: "{player1} flossed aggressively, and {player2} left, unable to comprehend such a cringe-worthy display.",
  },
  {
    text: "{player1} dropped a 'Your mom' joke so devastating, {player2} immediately left, questioning their entire existence.",
  },
  {
    text: "{player1} dabbed on {player2} so hard, it caused a seismic event that sent {player2} flying off the battlefield.",
  },
  {
    text: "{player1} made a bad pun, and {player2} groaned so hard they forfeited the match.",
  },
  {
    text: "{player1} hit {player2} with a barrage of memes, and {player2} was left crying in the corner, completely overwhelmed.",
  },
  {
    text: "{player1} casually reminded {player2} that their crush will never like them back, and {player2} broke down in tears.",
  },
  {
    text: "{player1} blew a kiss, and {player2} got so flustered they tripped over their own feet and ran away.",
  },
  {
    text: "{player1} opened a bag of chips during battle, the crunch alone was enough to make {player2} give up.",
  },
  {
    text: "{player1} mentioned spoilers to {player2}’s favorite show, and {player2} left in tears before they could hear them.",
  },
  {
    text: "{player1} did the moonwalk, and {player2} fell backwards trying to copy them, losing the fight instantly.",
  },
  {
    text: "{player1} complimented {player2}'s terrible haircut, and the backhanded comment was enough to make {player2} leave.",
  },
  {
    text: "{player1} activated their trap card, and {player2} immediately surrendered knowing they stood no chance.",
  },
  {
    text: "{player1} rolled a natural 20, while {player2} critically failed, falling flat on their face in utter defeat.",
  },
  {
    text: "{player1} hit {player2} with a pie to the face, and {player2} slinked away, wiping off whipped cream and shame.",
  },
  {
    text: "{player1} faked a sneeze, and {player2} fled, convinced they couldn’t handle any more germs or social awkwardness.",
  },
  {
    text: "{player1} simply smirked, and {player2} ran, terrified of what was coming next.",
  },
  {
    text: "{player1} air-guitar solo'd so epically that {player2} had no choice but to concede defeat, unable to top it.",
  },
  {
    text: "{player1} pulled out a kazoo and played a tune so bad that {player2} left before their ears started bleeding.",
  },
  {
    text: "{player1} offered a limp handshake, and {player2} walked away, crushed by the sheer awkwardness of the situation.",
  },
  {
    text: "{player1} pulled out a cheesy pick-up line, and {player2} died a little inside, fleeing before it got worse.",
  },
  {
    text: "{player1} tried a thumb war, but {player2} lost so fast they cried.",
  },
  {
    text: "{player1} insulted {player2}’s fashion sense so badly that {player2} fled, clutching their out-of-season outfit.",
  },
  {
    text: "{player1} delivered a devastating roast, and {player2} left the chat, unable to clap back.",
  },
  {
    text: "{player1} turned around, but {player2} tripped over themselves before anything even started.",
  },
];

let reviveTexts = [
  {
    text: "{player1} rose from the ashes like a majestic phoenix, but with way more dramatic flair.",
  },
  {
    text: "After a quick nap, {player1} is back and ready for round two, fully refreshed and slightly confused!",
  },
  {
    text: "With the power of caffeine, {player1} is back on their feet and jittering with energy!",
  },
  {
    text: "A motivational speech from their imaginary coach has revived {player1}, who’s now ready to fight... or maybe give another speech!",
  },
  {
    text: "With a dramatic gasp, {player1} revived, as if they had just remembered they left the oven on!",
  },
  {
    text: "Thanks to a nearby health potion (or was it just soda?), {player1} is back in action, slightly sticky but determined!",
  },
  {
    text: "{player1} pulled themselves together, literally, with duct tape and sheer willpower. It’s not pretty, but they’re alive!",
  },
  {
    text: "{player1} respawned after solving a difficult CAPTCHA, now more frustrated than ever but definitely alive!",
  },
  {
    text: "After realizing they missed a level-up opportunity, {player1} popped back into existence, ready to grind more XP!",
  },
  {
    text: "With the power of positive thinking, {player1} is revived and radiating good vibes (and a little bit of glitter).",
  },
  {
    text: "A quick snack break has brought {player1} back to life, fueled by nachos and pure determination!",
  },
  {
    text: "{player1} emerged from the void, muttering something about unfinished business... and snack time!",
  },
  {
    text: "{player1} received a 'revive' email notification, clicked the link, and is now back in the game!",
  },
  {
    text: "A sudden burst of Wi-Fi signal revived {player1}, who’s back and buffering slightly less!",
  },
  {
    text: "{player1} simply refused to stay down, and popped back up like an uninvited guest at a party.",
  },
  {
    text: "{player1} revived after receiving a group chat meme, because who could stay dead after that laugh?",
  },
  {
    text: "{player1} regenerated, citing the power of sheer pettiness as their fuel.",
  },
  {
    text: "After a dramatic monologue, {player1} revived, determined to finish their speech.",
  },
  {
    text: "{player1} reappeared with a ‘ta-da’, because what’s a good comeback without flair?",
  },
  {
    text: "{player1} revived after reading the motivational quote on their coffee cup. They are now unstoppable (and a little caffeinated)!",
  },
  {
    text: "{player1} rejoined the battle after realizing they forgot to turn off the bathroom light!",
  },
  {
    text: "With a surge of adrenaline (and maybe some sugar), {player1} is back on their feet, ready to cause chaos again!",
  },
  {
    text: "A mysterious force (probably their cat) has revived {player1}, who’s now ready to fight with more determination!",
  },
  {
    text: "{player1} woke up from a power nap, recharged and confused, but definitely back!",
  },
  {
    text: "After a brief existential crisis, {player1} decided that the only thing left to do is… get back into the fight!",
  },
  {
    text: "Summoned back to life by an overly enthusiastic cheerleader, {player1} is ready to show what they’ve got!",
  },
  {
    text: "{player1} respawned with a dramatic entrance, cape swirling and theme music playing in the background.",
  },
  {
    text: "{player1} was revived after remembering they hadn’t finished that last episode of their favorite show!",
  },
  {
    text: "Fueled by pure stubbornness and a dash of sarcasm, {player1} is back in action!",
  },
  {
    text: "A random motivational quote on social media brought {player1} back to life, slightly inspired and very ready!",
  },
  {
    text: "Revived by the sheer power of their Wi-Fi reconnecting, {player1} is back and loading faster than ever!",
  },
  {
    text: "After receiving a critical firmware update, {player1} rebooted with new energy and slightly more bugs!",
  },
  {
    text: "{player1} came back to life after finding out there’s still pizza in the fridge!",
  },
  {
    text: "{player1} respawned after an epic power-up sequence, complete with special effects and a slow-motion scene!",
  },
  {
    text: "A quick boost from a mysterious energy drink has revived {player1}, now ready to fight and bounce off walls!",
  },
  {
    text: "After a dramatic pause, {player1} reappeared with a witty one-liner and a smirk.",
  },
  {
    text: "{player1} came back after remembering they left something important unfinished… like this battle!",
  },
  {
    text: "{player1} revived with a flash of lightning and a lot of over-the-top special effects.",
  },
  {
    text: "With the power of nostalgia for their favorite childhood game, {player1} respawned, controller in hand!",
  },
  {
    text: "{player1} jumped back into action after realizing they missed out on all the drama while they were down!",
  },
  {
    text: "A glitch in the matrix brought {player1} back, now questioning reality but still ready to fight!",
  },
  {
    text: "{player1} respawned after finally deciphering that mysterious loading screen tip!",
  },
  {
    text: "Revived by the smell of fresh coffee, {player1} is back, hyper-caffeinated and jittery!",
  },
  {
    text: "A sudden epiphany about life (or maybe just battle strategies) brought {player1} back to life!",
  },
  {
    text: "{player1} popped back up like a bad Wi-Fi connection—glitchy, but alive!",
  },
  {
    text: "After a quick existential reboot, {player1} is back with a vengeance (and a slightly better plan)!",
  },
  {
    text: "{player1} revived thanks to a life-saving meme—because laughter is the best medicine!",
  },
  {
    text: "With the power of a plot twist, {player1} is back, surprising everyone including themselves!",
  },
  {
    text: "{player1} respawned after hearing a distant ice cream truck and deciding life’s too short to stay down!",
  },
  {
    text: "{player1} returned with a dramatic flourish, looking a bit more dramatic than necessary!",
  },
  {
    text: "A brief moment of deep breathing (and possibly meditation) brought {player1} back with renewed focus!",
  },
  {
    text: "{player1} woke up from the dead like they hit the snooze button one too many times.",
  },
  {
    text: "Fueled by pure spite, {player1} is back and more determined than ever to win!",
  },
  {
    text: "After remembering the snack they left behind, {player1} is back, slightly hungry but fully revived!",
  },
  {
    text: "{player1} revived after receiving a motivational text from their mom. How could they not?",
  },
  {
    text: "With a dramatic eye roll, {player1} is back, annoyed but ready to finish what they started.",
  },
  {
    text: "A surprise plot twist in their favorite show brought {player1} back, eager to get back into the action!",
  },
  {
    text: "{player1} respawned after hearing that their rival is still standing. This isn’t over yet!",
  },
  {
    text: "{player1} revived after a long shower thought, and now they’ve got a brilliant new strategy!",
  },
  {
    text: "Summoned back by the sound of a loot box opening, {player1} is ready to dive in again!",
  },
];

let battleTitles = [
  "Celestial Demise",
  "Supernova Shutdown",
  "Nebula Knockout",
  "Orbital Obliteration",
  "Planetary Plummet",
  "Stardust Surrender",
  "Galaxy's End",
  "Eclipse Elimination",
  "Black Hole Beatdown",
  "Interstellar Implosion",
  "Lunar Loss",
  "Solar Smash",
  "Comet Clash",
  "Quasar Quake",
  "Space-time Slapdown",
  "Astral Avalanche",
  "Photon Finish",
  "Cosmic Collapse",
  "Zodiac Zero Hour",
  "Void Victory",
  "Galactic Goner",
  "Stellar Stumble",
  "Asteroid Annihilation",
  "Meteor Mayhem",
  "Cosmic Conundrum",
  "Starfall Standoff",
  "Gravitational Grind",
  "Constellation Catastrophe",
  "Celestial Wipeout",
  "Universal Uprising",
];

imageLinks = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkVYXMUY3gTovRG21LL3EY1VF56XZpqobUxA&s",
  "https://i1.sndcdn.com/artworks-000230779891-yxhs7u-t500x500.jpg",
  "https://static1.moviewebimages.com/wordpress/wp-content/uploads/2022/06/boruto-episode-65-naruto-sasuke-fight-1123512.jpg",
  "https://publish.one37pm.net/wp-content/uploads/2023/02/kakarot2.jpeg?fit=1360%2C765",
  "https://imgix.ranker.com/list_img_v2/2997/3142997/original/3142997-u1?w=817&h=427&fm=jpg&q=50&fit=crop",
  "https://twinfinite.net/wp-content/uploads/2022/07/demon-slayer.jpg?fit=1200%2C675",
];

reviveLinks = [
  "https://i.pinimg.com/736x/78/d0/8b/78d08be1916f652e29eb9318407150f9.jpg",
  "https://images-ng.pixai.art/images/orig/e5d9531f-69ef-49a3-9dd0-5098a932a6f6",
];

let rankData = {
  Drakon: [
    { threshold: 0, name: "Emberling", emoji: "🔻" },
    { threshold: 250, name: "Flame Wielder", emoji: "🔸" },
    { threshold: 500, name: "Blazeheart", emoji: "🔥" },
    { threshold: 750, name: "Infernal Stride", emoji: "🐉" },
    { threshold: 1000, name: "Scorched Herald", emoji: "🔱" },
    { threshold: 1250, name: "Pyre Sovereign", emoji: "🌋" },
    { threshold: 1500, name: "Wyrm Tyrant", emoji: "🪓" },
    { threshold: 1750, name: "Ashen Colossus", emoji: "🛡️" },
    { threshold: 2000, name: "Draconic Ascendant", emoji: "👑" },
  ],
  Nyxian: [
    { threshold: 0, name: "Whisperling", emoji: "🌑" },
    { threshold: 250, name: "Umbral Seeker", emoji: "🪄" },
    { threshold: 500, name: "Shadecaller", emoji: "🦉" },
    { threshold: 750, name: "Nightweaver", emoji: "🧪" },
    { threshold: 1000, name: "Mindshaper", emoji: "🧠" },
    { threshold: 1250, name: "Oracle of Dusk", emoji: "🕯️" },
    { threshold: 1500, name: "Archivist of Echoes", emoji: "📚" },
    { threshold: 1750, name: "Voidmind Sage", emoji: "✴️" },
    { threshold: 2000, name: "Eternal Observer", emoji: "👁️" },
  ],
  Vyrn: [
    { threshold: 0, name: "Cub of the Storm", emoji: "🐾" },
    { threshold: 250, name: "Windrunner", emoji: "🌪️" },
    { threshold: 500, name: "Skyhowler", emoji: "🐺" },
    { threshold: 750, name: "Forest Warden", emoji: "🌲" },
    { threshold: 1000, name: "Thunderclaw", emoji: "⚡" },
    { threshold: 1250, name: "Tempest Shaman", emoji: "🪶" },
    { threshold: 1500, name: "Alpha Guardian", emoji: "🪓" },
    { threshold: 1750, name: "Spiritbound", emoji: "🧭" },
    { threshold: 2000, name: "Stormborn Alpha", emoji: "🐉" },
  ],
};

// Emoji to Breed Mapping
const breedMap = {
  '🐉': 'Drakon',
  '🦉': 'Nyxian',
  '🐺': 'Vyrn',
};

const blessings = [
  "🌠 Cosmic rays beam down on **${username}**.",
  "🦋 Ethereal winds wrap gently around **${username}**.",
  "✨ **${username}** is kissed by starlight.",
  "🔮 Fate favors **${username}** this round.",
  "🌀 An ancient force empowers **${username}**.",
  "🌿 Nature's song uplifts **${username}**.",
  "🌞 The sun flares warmly for **${username}**.",
  "🎇 Celestial fireworks ignite above **${username}**.",
  "🌊 Ocean spirits surge within **${username}**.",
  "🔥 Ember spirits whisper strength to **${username}**.",
  "🎐 The breeze carries blessings to **${username}**.",
  "🛕 Temples of time bless **${username}**.",
  "🦄 A mythical presence blesses **${username}**.",
  "🧬 The threads of reality bend toward **${username}**.",
  "🌈 The horizon bends in honor of **${username}**.",
  "💎 A crystal pulse resonates with **${username}**.",
  "🌌 A distant galaxy reflects **${username}**’s glory.",
  "🛸 Visitors from beyond infuse **${username}** with power.",
  "🕊️ Spirit guardians grant peace to **${username}**.",
  "🧿 Divine protection surrounds **${username}**.",
  "🪞 Reflections shimmer with **${username}**’s light.",
  "📜 Prophecies speak of **${username}**’s rise.",
  "🎶 Celestial melodies guide **${username}**’s aura.",
  "🧚 A fey touch ignites **${username}**’s potential.",
  "🌬️ Whispering winds chant **${username}**’s name.",
  "🪐 Saturn’s rings shimmer for **${username}**.",
  "🕯️ A sacred flame burns brighter for **${username}**.",
  "🧙 A forgotten wizard blesses **${username}** from afar.",
  "🛡️ Astral armor shields **${username}**.",
  "🍃 The leaves rustle in approval of **${username}**.",
  "📿 Mystic chants empower **${username}**’s soul.",
  "🌟 A divine pulse surges through **${username}**.",
  "🖋️ Destiny rewrites itself for **${username}**.",
  "⚓ The tides of fortune lift **${username}** higher.",
  "💖 Aura wells overflow within **${username}**.",
  "🌐 The ley lines converge beneath **${username}**.",
  "🦢 Serenity finds its home in **${username}**.",
  "🌋 Volcanic spirits roar in honor of **${username}**.",
  "🎭 Masks of fate smile upon **${username}**.",
  "🧩 The puzzle of fate clicks into place for **${username}**.",
  "📡 The stars transmit power to **${username}**.",
  "🎒 A traveler’s relic blesses **${username}**.",
  "🧪 An alchemist’s gift bubbles around **${username}**.",
  "⛩️ The shrine bells toll for **${username}**’s blessing.",
  "💠 A gem of power fuses into **${username}**’s aura.",
  "🫧 Sacred mist clings to **${username}**’s form.",
  "🌟 A fallen star awakens inside **${username}**.",
  "🪶 A feather from a holy beast lands on **${username}**.",
  "🫀 Lifeblood of the cosmos pulses within **${username}**.",
  "🌫️ The veil lifts momentarily for **${username}**.",
  "🧭 True north aligns for **${username}**.",
  "🌃 A constellation forms in honor of **${username}**.",
  "🥀 Even wilted roses bloom at **${username}**’s feet.",
  "🧵 Threads of time weave around **${username}**.",
  "📖 A forgotten tome speaks **${username}**’s name.",
  "🎐 Wind chimes sing blessings to **${username}**.",
  "🔗 The chains of fate loosen for **${username}**.",
  "🔔 A sacred bell rings just for **${username}**.",
  "🌤️ Clouds part in reverence for **${username}**.",
  "🧸 An ancient guardian awakens beside **${username}**.",
  "📦 A mysterious relic enhances **${username}**’s soul.",
  "🗿 The ancients nod silently at **${username}**.",
  "🪙 The coin of fate flips favorably for **${username}**.",
  "🛶 A celestial river carries **${username}** to glory.",
  "🕊️ Peaceful spirits hum around **${username}**.",
  "🎑 The moon glows with **${username}**’s name etched in light.",
  "🧿 A charm activates near **${username}**.",
  "🗺️ **${username}** walks the sacred path.",
  "🧼 Cleansing waves purify **${username}**.",
  "🕸️ The web of fate vibrates for **${username}**.",
  "⚗️ An ancient potion boosts **${username}**’s essence.",
  "🍄 A forest guardian shares spores of strength with **${username}**.",
  "🪄 A burst of primal magic finds **${username}**.",
  "🦚 A celestial bird graces **${username}**’s shoulder.",
  "🎠 Dreams and echoes lift **${username}** to new heights.",
  "🌙 Moonlight emboldens **${username}**’s steps.",
  "👁️ The all-seeing eye peers and smiles at **${username}**."
];

const curses = [
  "💀 The aura field rejects **${username}**.",
  "🌑 Shadows drain **${username}**’s essence...",
  "🕳️ A rift collapses around **${username}**.",
  "☠️ **${username}** is marked by misfortune.",
  "🕷️ Something ancient steals aura from **${username}**...",
  "🦴 Bones whisper omens around **${username}**.",
  "⚫ Darkness folds inward on **${username}**.",
  "⚰️ A phantom hand reaches for **${username}**’s soul.",
  "🔻 A cursed sigil pulses under **${username}**’s feet.",
  "🌪️ A spectral storm swallows **${username}**’s aura.",
  "🪦 Forgotten spirits gnaw at **${username}**’s fate.",
  "🩸 A blood moon bleeds over **${username}**.",
  "🔥 Black flames consume **${username}**’s light.",
  "🫥 Echoes of regret surround **${username}**.",
  "🕯️ The candle of fate dims for **${username}**.",
  "📉 **${username}** is touched by entropy.",
  "💔 A fracture appears in **${username}**’s spirit.",
  "🧿 A cursed eye fixates on **${username}**.",
  "🧬 Corruption weaves through **${username}**’s aura.",
  "🎭 A mask of despair binds to **${username}**.",
  "🕸️ Webs of misfortune entangle **${username}**.",
  "🌫️ A choking fog surrounds **${username}**.",
  "👁️ A gaze from the void falls on **${username}**.",
  "🧟 The dead murmur **${username}**’s name.",
  "🪰 A swarm of bad luck clings to **${username}**.",
  "🔒 Aura chains wrap tightly around **${username}**.",
  "🎭 Fate mocks **${username}** with cruel irony.",
  "🕳️ **${username}** slips into a shadowed fissure.",
  "⚠️ A warning bell tolls for **${username}**.",
  "🌘 The eclipse drains **${username}** silently.",
  "🗡️ A dagger of fate slices **${username}**’s aura.",
  "🚫 A seal of denial stamps over **${username}**.",
  "🔮 The void twists **${username}**’s path.",
  "🛑 An astral barrier halts **${username}**’s flow.",
  "🥀 Luck wilts in the hands of **${username}**.",
  "🔇 The universe turns silent toward **${username}**.",
  "🩹 Wounds of the past reopen for **${username}**.",
  "🌌 The stars refuse to look at **${username}**.",
  "🪤 Trapped in karma, **${username}** loses ground.",
  "🪓 A spiritual cleave disrupts **${username}**.",
  "🦠 Malignant energy infects **${username}**’s aura.",
  "🫳 Fate drops **${username}** like a stone.",
  "🌀 A reverse current sucks in **${username}**’s energy.",
  "🫧 Aura bubbles burst around **${username}**.",
  "🎲 Misfortune rolls a critical hit on **${username}**.",
  "🧨 A spiritual mine explodes under **${username}**.",
  "🏚️ The old gods ignore **${username}**’s prayers.",
  "💣 A karmic blast hits **${username}** unprepared.",
  "🥶 Cold emptiness seeps into **${username}**.",
  "👿 Something wicked finds **${username}**.",
  "🧛 The leeching curse sucks from **${username}**.",
  "🪦 Forgotten names drag down **${username}**.",
  "🫁 **${username}** gasps as aura thins in the air.",
  "🌑 The eclipse shadows **${username}**’s journey.",
  "🩸 Blood offerings fail for **${username}**.",
  "🧲 Negativity clings tight to **${username}**.",
  "🫥 The mist denies **${username}** form.",
  "🪤 **${username}** is caught in fate’s snare.",
  "🔁 A cursed loop traps **${username}**’s soul.",
  "🧿 An evil talisman pulses on **${username}**.",
  "🧊 Ice of oblivion clings to **${username}**’s chest.",
  "💀 The death card flips for **${username}**.",
  "🩻 Transparency exposes **${username}** to the void.",
  "📉 Decline echoes in **${username}**’s energy.",
  "🥾 Karma kicks **${username}** off-balance.",
  "🦷 Phantom bites weaken **${username}**’s essence.",
  "⚰️ **${username}** is entombed by despair.",
  "🪞 A cursed reflection haunts **${username}**.",
  "🪲 An aura rot crawls up **${username}**’s spine.",
  "🌑 Shadows choke the flame within **${username}**.",
  "🕸️ Spider gods spin curses into **${username}**.",
  "🛏️ Nightmares gnaw at **${username}**’s energy.",
  "🧨 The floor cracks open beneath **${username}**.",
  "💣 A silent bomb detonates in **${username}**’s fate.",
  "🪰 Pestilence crawls behind **${username}**’s back.",
  "🎭 The mask of luck cracks for **${username}**.",
  "🥀 Aura petals fall lifeless from **${username}**."
];

const eventIntroLines = [
  "🌀 *Something stirs in the Aura Field...*",
  "🔮 *A ripple in fate begins to form...*",
  "⚠️ *The air grows still — something is about to happen...*",
  "🌫️ *A shimmer flickers on the horizon...*",
  "🪐 *Destiny pulses beneath your feet...*"
];

module.exports = {
  battleTexts,
  reviveTexts,
  battleTitles,
  imageLinks,
  reviveLinks,
  rankData,
  breedMap,
  blessings,
  curses,
  eventIntroLines
};
