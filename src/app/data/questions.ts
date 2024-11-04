import {QuestionData, QuestionType} from '../models/question/question';

export const data: QuestionData[] = [
  {
    questionType: QuestionType.multipleChoice,
    questionData: {
      question: 'What is the capital of India?',
      choices: [{
        id: 0,
        text: 'Delhi',
        pronunciation: 'dell-e'
      },
        {
          id: 1,
          text: 'Mumbai',
          pronunciation: 'mumbai'
        },
        {
          id: 2,
          text: 'Kolkata',
          pronunciation: 'kolkata'
        },
        {
          id: 3,
          text: 'Chennai',
          pronunciation: 'chennai'
        }
        ],
      answerIndexes: [0],
    }
  },
  {
    questionType: QuestionType.multipleChoice,
    questionData: {
      question: 'Which of the following are colors?',
      choices: [{
        id: 0,
        text: 'Blue',
      },
        {
          id: 1,
          text: 'Dog',
        },
        {
          id: 2,
          text: 'Pink',
        },
        {
          id: 3,
          text: 'Tulip',
        }
        ],
      answerIndexes: [0,2],
    },
    hint: ['it is not tulip','blue is sus'],
  }
]
