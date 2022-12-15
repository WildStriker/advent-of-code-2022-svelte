enum GameResponse {
	Rock = 1,
	Paper = 2,
	Scissors = 3
}

enum GameResult {
	Lose = 0,
	Draw = 3,
	Win = 6
}

export enum OurPickType {
	OurPick = 1,
	OurResult = 2
}

interface Dictionary<T> {
	[Key: string]: T;
}

const opponent_picks: Dictionary<GameResponse> = {
	A: GameResponse.Rock,
	B: GameResponse.Paper,
	C: GameResponse.Scissors
};

const our_picks: Dictionary<GameResponse> = {
	X: GameResponse.Rock,
	Y: GameResponse.Paper,
	Z: GameResponse.Scissors
};

const our_results: Dictionary<GameResult> = {
	X: GameResult.Lose,
	Y: GameResult.Draw,
	Z: GameResult.Win
};

class Round {
	opponent_pick: GameResponse;
	our_pick: GameResponse;
	our_result: GameResult;

	constructor(opponent_pick: GameResponse, our_pick: GameResponse, our_result: GameResult) {
		this.opponent_pick = opponent_pick;
		this.our_pick = our_pick;
		this.our_result = our_result;
	}

	get_score() {
		return this.our_pick + this.our_result;
	}
}

export function parse_data(data: String, interupt_pick: OurPickType): Round[] {
	const lines = data.replace(/\r/, '').split('\n');

	let rounds: Round[] = [];

	for (let line of lines) {
		const [opponent_pick_letter, our_letter] = line.split(' ');

		let opponent_pick = opponent_picks[opponent_pick_letter];
		let our_pick;
		let our_result;

		if (interupt_pick === OurPickType.OurPick) {
			our_pick = our_picks[our_letter];
			our_result = get_our_result(opponent_pick, our_pick);
		} else {
			our_result = our_results[our_letter];
			our_pick = get_our_pick(opponent_pick, our_result);
		}

		rounds.push(new Round(opponent_pick, our_pick, our_result));
	}

	return rounds;
}

export function get_our_result(opponent_pick: GameResponse, our_pick: GameResponse): GameResult {
	if (opponent_pick === our_pick) {
		return GameResult.Draw;
	}

	if (
		(our_pick === GameResponse.Rock && opponent_pick === GameResponse.Scissors) ||
		(our_pick === GameResponse.Paper && opponent_pick === GameResponse.Rock) ||
		(our_pick === GameResponse.Scissors && opponent_pick === GameResponse.Paper)
	) {
		return GameResult.Win;
	}

	return GameResult.Lose;
}

export function get_our_pick(opponent_pick: GameResponse, our_result: GameResult): GameResponse {
	if (our_result === GameResult.Draw) {
		return opponent_pick;
	}

	if (our_result === GameResult.Win) {
		switch (opponent_pick) {
			case GameResponse.Rock:
				return GameResponse.Paper;
			case GameResponse.Paper:
				return GameResponse.Scissors;
			default:
				return GameResponse.Rock;
		}
	}

	switch (opponent_pick) {
		case GameResponse.Rock:
			return GameResponse.Scissors;
		case GameResponse.Paper:
			return GameResponse.Rock;
		default:
			return GameResponse.Paper;
	}
}
