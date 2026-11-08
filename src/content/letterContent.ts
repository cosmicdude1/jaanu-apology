/**
 * =====================================================================
 * A LETTER FROM MY HEART - PERSONAL CONTENT CONFIGURATION
 * Dedicated to Chesta (jaanu) from bettu
 * =====================================================================
 */

export type SceneId =
  | 'opening'
  | 'apology'
  | 'promise'
  | 'memories'
  | 'letter'
  | 'envelope'
  | 'ending';

export interface SceneMeta {
  id: SceneId;
  index: number;
  navTitle: string;
  shortLabel: string;
}

export interface MemoryItem {
  id: string;
  imagePath: string; // Local asset path under public/images/memories/
  caption: string;
  date?: string;
  shortDescription?: string;
  location?: string;
  tag?: string;
  rotation?: number;
}

export interface PromiseVow {
  id: string;
  number: string;
  title: string;
  vow: string;
  detail: string;
}

export interface EndingResponseOption {
  id: 'read' | 'time' | 'talk';
  label: string;
  replyMessage: string;
  subnote: string;
}

export interface LetterContentConfig {
  // 1. Personal Identifiers
  girlfriendName: string;
  senderName: string;
  petNameForHer: string;

  // 2. Opening Section
  opening: {
    greeting: string;
    title: string;
    subtitle: string;
    introductoryNote: string;
    buttonLabel: string;
  };

  // 3. Apology Section
  apology: {
    headline: string;
    subtitle: string;
    text: string;
    reflections: {
      title: string;
      description: string;
    }[];
  };

  // 4. Promise Section
  promise: {
    headline: string;
    subtitle: string;
    text: string;
    vows: PromiseVow[];
  };

  // 5. Memory Gallery
  memories: MemoryItem[];

  // 6. Main Letter
  letter: {
    salutation: string;
    intro: string;
    paragraphs: string[];
    closing: string;
    dateString: string;
    postscript?: string;
  };

  // 7. Envelope Keepsake
  envelope: {
    label: string;
    headline: string;
    message: string;
    closingNote: string;
  };

  // 8. Ending Section
  ending: {
    headline: string;
    subtitle: string;
    finalMessage: string;
    heartPrompt: string;
    heartResponses: string[];
    responseOptions: EndingResponseOption[];
  };

  // 9. Navigation Scenes
  scenes: SceneMeta[];
}

export const websiteConfig: LetterContentConfig = {
  // ===================================================================
  // 1. NAMES & IDENTIFIERS
  // ===================================================================
  girlfriendName: 'Chesta',
  senderName: 'bettu',
  petNameForHer: 'jaanu',

  // ===================================================================
  // 2. OPENING SECTION
  // ===================================================================
  opening: {
    greeting: 'For my dearest Chesta',
    title: 'A Letter From My Heart',
    subtitle: 'Written with honesty, care, and stillness for my jaanu.',
    introductoryNote:
      'Chesta, I made this quiet space just for you—so I could speak to your heart without rush, noise, or distraction. Whenever you are ready, please take your time and step inside.',
    buttonLabel: 'Open Letter',
  },

  // ===================================================================
  // 3. APOLOGY SECTION
  // ===================================================================
  apology: {
    headline: 'A Sincere Apology',
    subtitle: 'No excuses, no rationalizing—just pure accountability from bettu.',
    text:
      'Chesta, I am truly sorry for the hurt, frustration, and distance my thoughtlessness caused. Looking back, I recognize how my behavior affected you, and it breaks my heart knowing that I caused distress to the person I cherish most. The responsibility is entirely mine, and I deeply regret letting my jaanu down.',
    reflections: [
      {
        title: 'Acknowledging Your Feelings',
        description:
          'I understand that my actions left you feeling hurt, unheard, and disappointed. Your feelings are completely valid, and I never want you to feel that your peace is secondary.',
      },
      {
        title: 'Taking Full Responsibility',
        description:
          'I am not offering excuses, stress, or bad timing to deflect what happened. You deserved patience, consideration, and unconditional gentleness from me, and I failed to give you that in that moment.',
      },
    ],
  },

  // ===================================================================
  // 4. PROMISE SECTION
  // ===================================================================
  promise: {
    headline: 'What You Mean to Me',
    subtitle: 'You are irreplaceable, Chesta, and I treat our bond with deep reverence.',
    text:
      'Loving you, jaanu, is the most precious part of my life. Our connection was built on honest trust, warm laughter, and genuine respect. Disagreements and mistakes hurt deeply, but they also remind me how much I value you and how committed bettu is to becoming the patient, thoughtful partner you deserve.',
    vows: [
      {
        id: 'vow-1',
        number: '01',
        title: 'To Listen Deeply',
        vow: 'I promise to pause and understand your heart before reacting.',
        detail:
          'Giving your feelings, thoughts, and boundaries full reverence, calm presence, and tenderness without defensiveness.',
      },
      {
        id: 'vow-2',
        number: '02',
        title: 'To Guard Your Peace',
        vow: 'I promise to be your refuge, never the reason you feel heavy.',
        detail:
          'Holding space for you on quiet days and ensuring our connection always feels safe, warm, and comforting.',
      },
      {
        id: 'vow-3',
        number: '03',
        title: 'To Back Words with Consistency',
        vow: 'I promise that my steady daily actions will reflect this apology.',
        detail:
          'Words only hold value when followed by real change. I am dedicated to proving my love through patience and consistency every single day.',
      },
    ],
  },

  // ===================================================================
  // 5. MEMORY GALLERY
  // ===================================================================
  memories: [
    {
      id: 'mem-1',
      imagePath: '/images/memories/memory-1.svg',
      caption: 'The way your smile brightens everything around us',
      date: 'Our Quiet Moments',
      location: 'Where Time Felt Still',
      shortDescription:
        'I still remember how easy it feels to talk to you about everything in the world, jaanu.',
      tag: 'Memory 01',
      rotation: -1.5,
    },
    {
      id: 'mem-2',
      imagePath: '/images/memories/memory-2.svg',
      caption: 'Our uncontrollable laughter over the simplest little things',
      date: 'Pure Joy',
      location: 'Just You & Me',
      shortDescription:
        'Your laugh has always been bettu’s favorite sound in the world.',
      tag: 'Memory 02',
      rotation: 1.8,
    },
    {
      id: 'mem-3',
      imagePath: '/images/memories/memory-3.svg',
      caption: 'Quiet evenings when no words were needed, just being together',
      date: 'Peaceful Silence',
      location: 'Side by Side',
      shortDescription:
        'Moments where simply holding your hand gave me all the comfort I ever needed.',
      tag: 'Memory 03',
      rotation: -1.2,
    },
    {
      id: 'mem-4',
      imagePath: '/images/memories/memory-4.svg',
      caption: 'Late night conversations whispering about our dreams',
      date: 'Starlight & Secrets',
      location: 'Under the Quiet Sky',
      shortDescription:
        'Every conversation with you reminds me how lucky I am to share my thoughts with my Chesta.',
      tag: 'Memory 04',
      rotation: 1.6,
    },
  ],

  // ===================================================================
  // 6. MAIN LETTER
  // ===================================================================
  letter: {
    salutation: 'Dearest Chesta, my jaanu,',
    intro:
      'I am writing this letter not to rush you past what happened, but to offer you my complete honesty, my heartfelt apologies, and my quiet reflection.',
    paragraphs: [
      'I have thought a great deal about where I went wrong. Seeing you hurt, quiet, or carrying distress because of my thoughtlessness is truly painful, because your peace of mind is what I care about above all else. You treat me with so much grace, patience, and warmth, and you deserved that same unwavering tenderness from bettu in return.',
      'I am not offering excuses, stress, or bad timing to justify my behavior. When I fell short, it was simply my failure to be mindful, patient, and emotionally aware. Recognizing that makes me truly sorry, and it has pushed me to look closely at myself and how I react under pressure.',
      'I want you to know the concrete steps I am taking: I am practicing pausing before responding, prioritizing listening over reacting, and making sure I communicate my feelings with care rather than thoughtlessness. I know trust and peace are rebuilt through steady behavior over time, not just words on a screen.',
      'Most importantly, Chesta, I want to respect your feelings and your timeline. I do not expect you to set your feelings aside or pretend nothing happened. You deserve the time and space you need, and I will be right here—listening, understanding, and committed to loving you with the care you deserve.',
    ],
    closing: 'Always and entirely yours,',
    dateString: 'Today & Every Tomorrow',
    postscript: 'P.S. Whenever you feel ready to talk, bettu is here to listen with an open heart.',
  },

  // ===================================================================
  // 7. ENVELOPE KEEPSAKE
  // ===================================================================
  envelope: {
    label: 'To my jaanu, Chesta',
    headline: 'A Sealed Keepsake',
    message:
      'My love for you remains steady, honest, and respectful of your space and your heart.',
    closingNote: 'Whenever you feel ready, my arms and heart are open for you.',
  },

  // ===================================================================
  // 8. ENDING SECTION
  // ===================================================================
  ending: {
    headline: 'Forever in My Heart',
    subtitle: 'Take all the time you need, Chesta. There is no rush, only love.',
    finalMessage:
      'Chesta, please take all the time and space you need to heal. There is no pressure, no expectation, and no rush. I simply wanted you to know how genuinely sorry bettu is, how deeply I respect you, and how grateful I am for every single day I have spent with my jaanu.',
    heartPrompt: 'Tap the heart to send a quiet hug',
    heartResponses: [
      'Sending you endless warmth and gentle care, jaanu...',
      'Holding you softly in my thoughts, Chesta...',
      'With all of bettu’s patience, love, and respect...',
      'Always right here whenever you need me, my jaanu...',
    ],
    responseOptions: [
      {
        id: 'read',
        label: 'I read your letter',
        replyMessage:
          'Thank you for reading through my words, jaanu. Knowing that you listened to my heart means everything to bettu.',
        subnote: 'No rush to say anything more. I am grateful for your time.',
      },
      {
        id: 'time',
        label: 'I need a little time',
        replyMessage:
          'Take all the time in the world, Chesta. There is zero pressure and zero expectation. Your peace comes first, always.',
        subnote: 'bettu will be right here waiting patiently whenever you are ready.',
      },
      {
        id: 'talk',
        label: 'I want to talk',
        replyMessage:
          'Whenever you want to talk, jaanu, bettu is here with open arms, ready to listen with all my heart and zero defensiveness.',
        subnote: 'Take your time. Whenever you feel comfortable, I am right here.',
      },
    ],
  },

  // ===================================================================
  // 9. SCENES NAVIGATION
  // ===================================================================
  scenes: [
    { id: 'opening', index: 0, navTitle: 'Welcome', shortLabel: 'Start' },
    { id: 'apology', index: 1, navTitle: 'My Apology', shortLabel: 'Remorse' },
    { id: 'promise', index: 2, navTitle: 'My Promise', shortLabel: 'Vows' },
    { id: 'memories', index: 3, navTitle: 'Our Story', shortLabel: 'Memories' },
    { id: 'letter', index: 4, navTitle: 'The Letter', shortLabel: 'Letter' },
    { id: 'envelope', index: 5, navTitle: 'A Keepsake', shortLabel: 'Unseal' },
    { id: 'ending', index: 6, navTitle: 'Forever', shortLabel: 'Heart' },
  ],
};
