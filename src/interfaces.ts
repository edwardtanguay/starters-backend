export interface IRawStarter {
	id: number;
	idCode: string;
	title: string;
	description: string;
	featureMarkdown: string;
	githubUrl: string;
	githubUrl2: string;
	installMarkdown: string;
	demoUrl: string;
	updowngradeList: string;
	learningMaterialList: string;
	todoList: string;
	hasAnimation: boolean;
}

export interface IStarter extends IRawStarter {
	imageUrl: string;
	readmeText: string;
	isFullStack: boolean;
	updowngradeItems: IUpdowngradeItem[];
	learningMaterialItems: ILearningMaterialItem[];
	todoItems: string[];
}

export interface IUpdowngradeItem {
	text: string;
	idCode: string;
};

export interface ILearningMaterialItem {
	title: string;
	url: string;
}
