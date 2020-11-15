export interface IRecipe {
    id: string;
    category: string;
    createdDate: number;
    creatorId: string;
    creatorName: string;
    imageUrl: string;
    ingredients: string;
    likes: number;
    likesArr: string[];
    recipeDescription: string;
    title: string;
    totalTime: string;
    yields: string;
}