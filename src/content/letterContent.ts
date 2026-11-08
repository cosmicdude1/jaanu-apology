/**
 * =====================================================================
 * A LETTER FROM MY HEART - PERSONAL CONTENT CONFIGURATION
 * Dedicated to Chesta (jaanu) from bettu
 * =====================================================================
 */

export type SceneId =
  | 'opening'
  | 'apology'
  | 'personal-apology'
  | 'promise'
  | 'memories'
  | 'her-gallery'
  | 'diwali'
  | 'letter'
  | 'envelope'
  | 'ending';

export interface SceneMeta {
  id: SceneId;
  index: number;
  navTitle: string;
  shortLabel: string;
}

export interface VideoCallMemory {
  id: string;
  imagePath: string; // Asset path under public/images/memories/
  caption: string;
  date?: string;
  location?: string;
  shortDescription?: string;
  tag?: string;
  rotation?: number;
}

export type MemoryItem = VideoCallMemory;

export interface HerPhotoItem {
  id: string;
  imagePath: string; // Asset path under public/images/her/
  title: string;
  caption: string;
  date?: string;
  note?: string;
  tag?: string;
  aspectRatio?: 'portrait' | 'square';
}

export interface ApologyPhotoConfig {
  imagePath: string; // Asset path under public/images/apology/
  heading: string;
  subtitle: string;
  supportingMessage: string;
  caption: string;
  badge: string;
  diwaliWish: string;
  loveMessage: string;
}

export interface FestivalConfig {
  title: string;
  greeting: string;
  message: string;
  blessing: string;
  imagePath?: string; // Optional path under public/images/festival/
}

export interface DiwaliSceneConfig {
  headline: string;
  greeting: string;
  subtitle: string;
  intro: string;
  paragraphs: string[];
  closing: string;
  diyaPrompt: string;
  celebrateButtonLabel: string;
  celebrateResponse: string;
  marigoldDetail: string;
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

  // 2. Real Photographs & Media Configurations
  herMainPhoto: string;
  herSecondPhoto: string;
  meSorryPhoto: string;

  // 3. Opening Section
  opening: {
    greeting: string;
    title: string;
    subtitle: string;
    introductoryNote: string;
    buttonLabel: string;
  };

  // 4. Apology Section (Accountability & Reflections)
  apology: {
    headline: string;
    subtitle: string;
    text: string;
    reflections: {
      title: string;
      description: string;
    }[];
  };

  // 5. Personal Apology Photograph Section ("I wish I could say this in person")
  apologyPhoto: ApologyPhotoConfig;

  // 6. Promise Section
  promise: {
    headline: string;
    subtitle: string;
    text: string;
    vows: PromiseVow[];
  };

  // 7. Video Call Memories Gallery
  memories: VideoCallMemory[];

  // 8. Her Photo Gallery ("A Little Gallery of You")
  herGallery: {
    headline: string;
    subtitle: string;
    intro: string;
    photos: HerPhotoItem[];
  };

  // 9. Dedicated Diwali Scene ("A Little Diwali Wish For You")
  diwali: DiwaliSceneConfig;

  // 10. Festival & Diwali Wishes Legacy Config
  festival: FestivalConfig;

  // 10. Main Letter
  letter: {
    salutation: string;
    intro: string;
    paragraphs: string[];
    closing: string;
    dateString: string;
    postscript?: string;
  };

  // 11. Envelope Keepsake
  envelope: {
    label: string;
    headline: string;
    message: string;
    closingNote: string;
  };

  // 12. Ending Section
  ending: {
    headline: string;
    subtitle: string;
    finalMessage: string;
    diwaliBlessing: string;
    heartPrompt: string;
    heartResponses: string[];
    responseOptions: EndingResponseOption[];
  };

  // 13. Navigation Scenes
  scenes: SceneMeta[];
}

export const websiteConfig: LetterContentConfig = {
  // ===================================================================
  // 1. NAMES & IDENTIFIERS
  // ===================================================================
  girlfriendName: 'Chesta',
  senderName: 'bettu',
  petNameForHer: 'jaanu',

  // Default Asset Paths (Organized in public/images/)
  herMainPhoto: '/images/her/her-1.jpg',
  herSecondPhoto: '/images/her/her-2.jpg',
  meSorryPhoto: '/images/apology/my-apology.jpg',

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
  // 3. APOLOGY SECTION (Accountability & Reflections)
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
  // 4. PERSONAL APOLOGY PHOTOGRAPH SECTION
  // ===================================================================
  apologyPhoto: {
    imagePath: '/images/apology/my-apology.jpg',
    heading: 'I wish I could say this to you in person.',
    subtitle: 'Seeing you upset broke my heart. Here is bettu holding his ears for his jaanu.',
    supportingMessage:
      'This is me, saying sorry from the bottom of my heart. I know words alone cannot undo what happened, but I want my actions to show you how much I mean it.',
    caption: 'Holding my ears with genuine remorse and asking for my jaanu’s forgiveness.',
    badge: 'Holding Ears For Jaanu',
    diwaliWish: 'Wishing my sweetest Chesta a joyful, blessed, and happy Diwali.',
    loveMessage: 'I love you so, so much, jaanu. Always and forever.',
  },

  // ===================================================================
  // 5. PROMISE SECTION
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
  // 6. VIDEO CALL MEMORIES GALLERY (From public/images/memories/)
  // ===================================================================
  memories: [
    {
      id: 'mem-1',
      imagePath: '/images/memories/videocall-1.jpg',
      caption: 'Late night video calls where hours vanished like minutes',
      date: 'Midnight Smiles',
      location: 'Across Our Screens',
      shortDescription:
        'No matter how long or tiring the day was, seeing your sleepy smile through the screen made everything peaceful and right at home.',
      tag: 'Video Call Moment 1',
      rotation: -1.2,
    },
    {
      id: 'mem-2',
      imagePath: '/images/memories/videocall-2.jpg',
      caption: 'Uncontrollable laughter only you and I could share',
      date: 'Pure Happiness',
      location: 'Our Safe Space',
      shortDescription:
        'Your silly expressions and sweet giggles have always been bettu’s absolute favorite sound in the world.',
      tag: 'Video Call Moment 2',
      rotation: 1.5,
    },
    {
      id: 'mem-3',
      imagePath: '/images/memories/videocall-3.jpg',
      caption: 'Quiet calls when just seeing you brought warmth',
      date: 'Comforting Silence',
      location: 'Close at Heart',
      shortDescription:
        'Even in moments when neither of us spoke a word, having you on the other end gave me all the comfort I ever needed.',
      tag: 'Video Call Moment 3',
      rotation: -1.0,
    },
    {
      id: 'mem-4',
      imagePath: '/images/memories/videocall-4.jpg',
      caption: 'Screens apart, but closer than ever in my heart',
      date: 'Forever Connected',
      location: 'Always With You',
      shortDescription:
        'Distance has never had any power over how deeply bettu loves, respects, and cherishes his jaanu.',
      tag: 'Video Call Moment 4',
      rotation: 1.4,
    },
  ],

  // ===================================================================
  // 7. HER PHOTO GALLERY ("A Little Gallery of You")
  // ===================================================================
  herGallery: {
    headline: 'A Little Gallery of You',
    subtitle: 'The grace, the warmth, and the light you carry so effortlessly.',
    intro:
      'Chesta, every photograph of you captures something truly rare—a sweetness and poise that takes my breath away every single time.',
    photos: [
      {
        id: 'her-photo-1',
        imagePath: '/images/her/her-1.jpg',
        title: 'The Girl Who Holds My Heart',
        caption: 'Pure elegance and warmth in every glance.',
        date: 'Forever Radiant',
        note: 'You carry so much grace, jaanu. Looking at this picture always reminds bettu how blessed he is.',
        tag: 'My Chesta',
        aspectRatio: 'portrait',
      },
      {
        id: 'her-photo-2',
        imagePath: '/images/her/her-2.jpg',
        title: 'That Unforgettable Smile',
        caption: 'The smile that brightens my entire world.',
        date: 'Breathtaking',
        note: 'When you smile like this, every worry fades away. You are truly one of a kind, my jaanu.',
        tag: 'My Jaanu',
        aspectRatio: 'portrait',
      },
    ],
  },

  // ===================================================================
  // 8. DEDICATED DIWALI CELEBRATION SCENE ("A Little Diwali Wish For You")
  // ===================================================================
  diwali: {
    headline: 'A Little Diwali Wish For You',
    greeting: 'Happy Diwali, my love. 🪔❤️',
    subtitle: 'Wishing light, warmth, and quiet peace to the one who illuminates my world.',
    intro: 'A quiet, heartfelt Diwali wish from bettu to his dearest jaanu.',
    paragraphs: [
      'Happy Diwali, my love.',
      'I wish this Diwali brings you all the happiness, peace, warmth, and beautiful moments that you deserve.',
      'And if there’s one little wish I have for this Diwali, it’s that we get to celebrate many more festivals together—sharing smiles, memories, and all the little things that make us happy.',
      'I’m sorry for the moments when I made your heart feel heavy.',
      'Today, I just want to wish you a beautiful Diwali and remind you how special you are to me.',
      'Happy Diwali, sweetheart. I love you.',
    ],
    closing: 'Always wishing your world to be filled with light — bettu',
    diyaPrompt: 'Touch the diya to brighten its light',
    celebrateButtonLabel: 'Celebrate this little moment with me',
    celebrateResponse:
      'May our days ahead be filled with shared smiles, laughter, and peaceful light together. Happy Diwali, jaanu! ✨',
    marigoldDetail: 'Bound in affection, sealed with care',
  },

  // ===================================================================
  // 9. FESTIVAL & DIWALI CONFIGURATION
  // ===================================================================
  festival: {
    title: 'Happy Diwali, My Jaanu',
    greeting: 'Wishing my sweetest Chesta a glowing, peaceful Festival of Lights.',
    message:
      'As we celebrate Diwali, my only wish is for your days to be filled with endless light, laughter, and calm. I promise to be someone who adds light to your life, never darkness.',
    blessing: 'May this year bring you abundant joy, health, and quiet peace, Chesta.',
    imagePath: '/images/apology/my-apology.jpg',
  },

  // ===================================================================
  // 9. MAIN LETTER - SINCERE, DIWALI WISH & ENDLESS DEVOTION
  // ===================================================================
  letter: {
    salutation: 'Dearest Chesta, my sweetest jaanu,',
    intro:
      'I am writing this letter not to rush you past what happened, but to offer you my complete honesty, my heartfelt apologies, and my quiet reflection.',
    paragraphs: [
      'I have thought a great deal about where I went wrong. Seeing you hurt, quiet, or carrying distress because of my thoughtlessness is truly painful, because your peace of mind is what I care about above all else. You treat me with so much grace, patience, and warmth, and you deserved that same unwavering tenderness from bettu in return.',
      'I am not offering excuses, stress, or bad timing to justify my behavior. When I fell short, it was simply my failure to be mindful, patient, and emotionally aware. Recognizing that makes me truly sorry from the bottom of my heart, and it has pushed me to look closely at myself and how I react under pressure.',
      'As we celebrate this festive season of light, I want to wish my dearest Chesta a very Happy Diwali. May your days be filled with brightness, peace, laughter, and the warmth you bring into my life. My sincere wish is to be someone who brings light to your heart, never shadow.',
      'I want you to know the concrete steps I am taking: I am practicing pausing before responding, prioritizing listening over reacting, and making sure I communicate my feelings with care rather than thoughtlessness. I know trust and peace are rebuilt through steady behavior over time, not just words on a screen.',
      'Most importantly, Chesta, I want to respect your feelings and your timeline. I do not expect you to set your feelings aside or pretend nothing happened. You deserve the time and space you need, and bettu will be right here—listening, understanding, and committed to loving you with the care you deserve.',
    ],
    closing: 'Always, entirely, and devotedly yours,',
    dateString: 'Happy Diwali & Every Tomorrow',
    postscript: 'P.S. Holding my ears forever until my jaanu smiles again. I love you with all my heart, Chesta.',
  },

  // ===================================================================
  // 10. ENVELOPE KEEPSAKE
  // ===================================================================
  envelope: {
    label: 'To my jaanu, Chesta',
    headline: 'A Sealed Keepsake',
    message:
      'My love for you remains steady, honest, and respectful of your space and your heart.',
    closingNote: 'Whenever you feel ready, my arms and heart are open for you.',
  },

  // ===================================================================
  // 11. ENDING SECTION
  // ===================================================================
  ending: {
    headline: 'Forever in My Heart',
    subtitle: 'Take all the time you need, Chesta. There is no rush, only love.',
    finalMessage:
      'Chesta, please take all the time and space you need to heal. There is no pressure, no expectation, and no rush. I simply wanted you to know how genuinely sorry bettu is, how deeply I respect you, and how grateful I am for every single day I have spent with my jaanu.',
    diwaliBlessing:
      'Happy Diwali, my sweetest jaanu! May this year bring light, peace, and boundless joy into your beautiful life.',
    heartPrompt: 'Tap the heart to send a quiet hug',
    heartResponses: [
      'Sending you endless warmth and gentle care, jaanu...',
      'Holding you softly in my thoughts, Chesta...',
      'With all of bettu’s patience, love, and respect...',
      'Wishing you a glowing, peaceful Happy Diwali, my jaanu...',
      'Always right here whenever you need me, Chesta...',
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
  // 12. SCENES NAVIGATION (Narrative Story Arc)
  // ===================================================================
  scenes: [
    { id: 'opening', index: 0, navTitle: 'Welcome', shortLabel: 'Start' },
    { id: 'apology', index: 1, navTitle: 'My Apology', shortLabel: 'Sorry' },
    { id: 'promise', index: 2, navTitle: 'My Promise', shortLabel: 'Vows' },
    { id: 'memories', index: 3, navTitle: 'Video Calls', shortLabel: 'Calls' },
    { id: 'her-gallery', index: 4, navTitle: 'Gallery of You', shortLabel: 'You' },
    { id: 'personal-apology', index: 5, navTitle: 'In Person', shortLabel: 'Heart' },
    { id: 'letter', index: 6, navTitle: 'The Letter', shortLabel: 'Letter' },
    { id: 'envelope', index: 7, navTitle: 'A Keepsake', shortLabel: 'Unseal' },
    { id: 'diwali', index: 8, navTitle: 'Diwali Wish', shortLabel: 'Diwali' },
    { id: 'ending', index: 9, navTitle: 'Forever', shortLabel: 'Peace' },
  ],
};
