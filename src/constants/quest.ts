import {Quest} from "../types/quest";
import {DIALOG_ID} from "./dialog";
import {CHARACTER_ID} from "./character";
import {QUEST_STEP} from "./questStep";
import {MAP_NAME} from "./mapName";
import {closeNPCDialogBubble} from "../utils/dialog";

export enum QUEST_ID {
    SAVE_THE_PRINCESS = "save-the-princess",
}

export const QUESTS: Quest[] = [
    {
        id: QUEST_ID.SAVE_THE_PRINCESS,
        name: "Save the Princess",
        steps: [
            {
                name: QUEST_STEP.SAVE_THE_PRINCESS.INTRO.name,
                id: QUEST_STEP.SAVE_THE_PRINCESS.INTRO.id,
                dialogs: [
                    {
                        id: DIALOG_ID.SAVE_THE_PRINCESS.STEP_1.INTRO,
                        characterId: CHARACTER_ID.NARRATOR,
                        narratorMap: MAP_NAME.CASTLE.BEDROOM,
                        autoPlay: true,
                        text: [
                            'Après l’exploration du château en ayant fais le plus attention possible pour ne pas faire de bruit, malgré tes genoux qui claquent, te voilà enfin dans la chambre royale.',
                            'Tu aperçois le fantôme d’une femme, tu ne sais pas bien comment réagir mais très vite tu te sens épris de tristesse pour elle, pourquoi est elle ici dans cet état ? Que lui est-il arrivé ?',
                            'Finalement elle se rapproche de toi, en tendant la main gracieusement, elle t’implore de l’aider.',
                            'Tu comprends avec ces mimes délicats qu’elle t’invite à descendre au plus profond du château, peut être y trouvera tu une solution à son problème ?',
                            'Le courage et une force inexplicable s\'emparent alors de toi, tu n’as qu’une idée en tête désormais, sauver cette gente dame. Tu adresse alors un sourire maladroit au fantôme et pars pour les profondeurs glaciales du château.'
                        ],
                        options: [
                            {
                                text: 'Continuer',
                                onClick: () => {
                                   closeNPCDialogBubble(CHARACTER_ID.NARRATOR)
                                },
                            }
                        ],
                    }
                ],
                currentDialogIndex: 0,
            },
            {
                name: QUEST_STEP.SAVE_THE_PRINCESS.MEET_THE_MAGICIAN.name,
                id: QUEST_STEP.SAVE_THE_PRINCESS.MEET_THE_MAGICIAN.id,
                dialogs: [
                    {
                        id: DIALOG_ID.SAVE_THE_PRINCESS.STEP_2.SPEAK_TO_THE_DUNGEON_KEEPER,
                        characterId: CHARACTER_ID.DUNGEON_KEEPER,
                        autoPlay: true,
                        text: [
                            'Je vois que tu as rencontré notre princesse, je ressens encore sa présence sur toi. Je m\'appelle Nko et je suis le gardien de ces lieux. Si elle t’a accepté alors moi aussi.',
                            'Elle t’a envoyé ici c’est pour que tu lui vienne en aide. En as-tu vraiment envie ? Bon, saches que nombreux sont les fous qui ont essayé et aucun, n’en est jamais revenu...',
                            'Très bien tu peux passer. Ou pas d’ailleurs, attends il faut que je te mette en garde sur ce qui t’attends, malheureux ! Tu voudrais pas mourir trop vite quand même ?',
                            'Au delà de cette porte tu vas rencontrer le terrible et magnificent “Grand Mage” ! Il n’a pas la réputation de tolérer les mauvaises manières. Hors ta dégaine et ta petite taille vont sûrement poser problème. J’ai une idée !',
                            'Enfile ce pantalon, il a meilleure allure que ton vieux pyjama. Ah et prends aussi ce crâne en guise de présent pour le Grand Mage, je viens juste de le nettoyer.',
                            'N’oublies pas de bien réfléchir à ce que tu vas lui dire et d’être extrêmement poli, la moindre erreur te sera fatale. Es-tu prêt ?',
                        ],
                        options: [
                            {
                                text: 'Je suis prêt !',
                                nextDialogId: DIALOG_ID.SAVE_THE_PRINCESS.STEP_2.THE_DARK_ROOM,
                            }
                        ],
                    },
                    {
                        id: DIALOG_ID.SAVE_THE_PRINCESS.STEP_2.THE_DARK_ROOM,
                        characterId: CHARACTER_ID.NARRATOR,
                        // narratorMap: MAP_NAME.CASTLE.LABO,
                        autoPlay: true,
                        text: [
                            'Tu pénètres alors l’antre du Grand Mage, la gorge serrée et le ventre noué. Tu as longuement réfléchi à comment tu allais te présenter. Il va de soi qu’il faudra également complimenter et approuver tout ce que ce terrible Mage allait dire et faire.',
                        ],
                        options: [
                            {
                                text: 'Continuer',
                                nextDialogId: DIALOG_ID.SAVE_THE_PRINCESS.STEP_2.SPEAK_TO_THE_MAGICIAN,
                            }
                        ],
                    },
                    {
                        id: DIALOG_ID.SAVE_THE_PRINCESS.STEP_2.SPEAK_TO_THE_MAGICIAN,
                        characterId: CHARACTER_ID.MAGICIAN,
                        autoPlay: true,
                        text: [
                            'Hey’ salut ! Wouha mais qu’est ce que tu fais ici d’abord ? Oh et puis c’est le crâne de tante Marge que t’as dans les mains t’es un voleur c’est ça ?! J’vais appeler mon popa, tu vas passer un sal quart d’heure mec !',
                            '"La peur s’empare de toi et tout le courage que tu avais jusqu’à lors à disparu. Confus et paniqué tu te mets à déblaterer toute l’histoire au gamin, priant pour qu’il te croit"',
                            'Ah ah ah comment j’t’ai bien eu, oh là là tu verrais ta tronche mec !',
                            'J’reconnais c’est Nko qui t’a joué un mauvais tour, j’avais tout de suite compris rassures toi, tu peux poser le crâne avec mes jouets, j’avais cassé le dernier ça tombe bien ! Merci',
                            'Je m’appelle Neos et mon popa l’est parti acheter des clopes qu’il m’a dit. Mais t’en fais pas j’vais t’aider moi ! J’sais faire hein, pour de vrai quoi. T’façon ça tombe bien avant de partir popa a fait une base d’élixir, mais il nous manque un truc.',
                            'Tu vas devoir parcourir les contrées les plus lointaines, traverser les mères et affronter l’armée des Cépanous, pour enfin demander audience auprès du gou…Attends tu m’écoutes là ?',
                            'Bon ça va j’aurai essayé hein… En fait je sais pas du tout où ça se trouve mais tu vas devoir trouver du “sang de dragon albinos”. T’as plus qu’a chercher par toi même ! Moi j’suis trop petit pour partir avec des inconnus. Reviens me voir quand tu l’auras !',
                        ],
                        options: [
                            {
                                text: 'Partir en  quête de la potion'
                            },
                        ],
                    },
                ],
                currentDialogIndex: 0,
            },
            {
                name: QUEST_STEP.SAVE_THE_PRINCESS.FIND_DRAGON_BLOOD.name,
                id: QUEST_STEP.SAVE_THE_PRINCESS.FIND_DRAGON_BLOOD.id,
                dialogs: [
                    {
                        id: DIALOG_ID.SAVE_THE_PRINCESS.STEP_3.PUT_POTION_IN_ALAMBIC,
                        characterId: CHARACTER_ID.MAGICIAN,
                        autoPlay: true,
                        text: [
                            'Salut mec ! Alors t’as trouvé ? Wouha trop cool ! Par contre ça pue de ouf cet élixir, oh quoi que non en fait. T’as laché une caisse ou quoi ?!',
                            'Vas-y verse tout dans l\'alambic et ça devrait fonctionner. Ou alors tu vas peut etre exploser, wouha ce sera drôle et dis ? Comment ça “non c’est pas drôle” ?',
                        ],
                        options: [
                            {
                                text: 'C\'est comme si c\'était déjà fait',
                                nextDialogId: DIALOG_ID.SAVE_THE_PRINCESS.STEP_3.WAIT_FOR_THE_ELIXIR,
                            }
                        ],
                    },
                    {
                        id: DIALOG_ID.SAVE_THE_PRINCESS.STEP_3.WAIT_FOR_THE_ELIXIR,
                        characterId: CHARACTER_ID.MAGICIAN,
                        autoPlay: true,
                        text: [
                            'Bravo ! Quand mon popa il va savoir que j’ai tout fais tout seul il va pas en rev.. ouais ouais bon ça va tu peux y aller, mec.',
                        ],
                        options: [
                            {
                                text: 'Continuer',
                            },
                        ],
                    }
                ],
                currentDialogIndex: 0,
            },
            {
                name: QUEST_STEP.SAVE_THE_PRINCESS.BRINGING_THE_POTION_TO_THE_PRINCESS.name,
                id: QUEST_STEP.SAVE_THE_PRINCESS.BRINGING_THE_POTION_TO_THE_PRINCESS.id,
                dialogs: [
                    {
                        id: DIALOG_ID.SAVE_THE_PRINCESS.STEP_4.BRINGING_THE_POTION_TO_THE_PRINCESS,
                        characterId: CHARACTER_ID.NARRATOR,
                        // narratorMap: MAP_NAME.CASTLE.BEDROOM,
                        autoPlay: true,
                        text: [
                            'Nerveux, tu regardes le fantôme virevoltant au-dessus de son lit. tu inspires profondément, débouches la fiole et la tend au fantôme.',
                        ],
                        options: [
                            {
                                text: 'Continuer',
                            }
                        ],
                    }
                ],
                currentDialogIndex: 0,
            },
            {
                name: QUEST_STEP.SAVE_THE_PRINCESS.THE_PRINCESS_IS_SAVED.name,
                id: QUEST_STEP.SAVE_THE_PRINCESS.THE_PRINCESS_IS_SAVED.id,
                dialogs: [
                    {
                        id: DIALOG_ID.SAVE_THE_PRINCESS.STEP_5.THE_PRINCESS_IS_SAVED,
                        characterId: CHARACTER_ID.NARRATOR,
                        // narratorMap: MAP_NAME.CASTLE.BEDROOM,
                        autoPlay: true,
                        text: [
                            '“ Une lumière intense jaillit alors dans la pièce, tu es éblouis et confus mais tu te sens bien. Une chaleur douce s’empare de ton corps, tu es comme bercé d’une sérénité sans pareil. C’est à ce moment là qu’une main vient se poser sur la tienne.”',
                            'Je ne comprends pas, on m’a jeté un sort avant que je puisse le chanter en public…',
                        ],
                        options: [
                            {
                                text: 'Continuer'
                            },
                        ],
                    }
                ],
                currentDialogIndex: 0,
            }
        ],
    }
];
