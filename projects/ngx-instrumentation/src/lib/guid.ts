/**
 * Basic implementation of a pseudo-random GUID
 */
export class Guid {

	// Generate a pseudo-random GUID
	static s4(): string {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}

	static guid(): string {
		return Guid.s4() + Guid.s4() + '-' + Guid.s4() + '-' + Guid.s4() + '-' + Guid.s4() + '-' + Guid.s4() + Guid.s4() + Guid.s4();
	}

}
