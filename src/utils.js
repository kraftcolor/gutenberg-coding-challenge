/**
 * Internal dependencies
 */
import countries from '../assets/countries.json';

/**
 * Get Emoji flag for the country code.
 *
 * @param {string} countryCode Country Code.
 * @return {string} Emoji flag.
 */
export function getEmojiFlag( countryCode ) {
	return String.fromCodePoint(
		...countryCode
			.toUpperCase()
			.split( '' )
			.map( ( char ) => 127397 + char.charCodeAt() )
	);
}

/**
 * Trim HTML content to desired woed length.
 *
 * @param {string} content HTML content string.
 * @param {number} length  number of words to trim to.
 * @return {string} Trimmed content string.
 */
export function trimContent( content, length = 5 ) {
	if ( ! content ) {
		return content;
	}

	return `${ content.trim().split( ' ', length ).join( ' ' ) }…`;
}

/**
 * Get country select options.
 */
export const countrySelectOptions = Object.entries( countries ).map(
	( [ code, name ] ) => ( {
		value: code,
		label: `${ getEmojiFlag( code ) } ${ name } ${ code }`,
	} )
);
