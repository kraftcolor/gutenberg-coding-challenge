/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import countries from '../assets/countries.json';

/**
 * Get related posts to a country code.
 * Note: This custom hook can be dropped in favor of a built-in hook useEntityRecords in the future.
 * (https://github.com/WordPress/gutenberg/pull/40162).
 *
 * @param {string} countryCode Country Code.
 *
 * @return {Object} Object with posts related to the country code.
 */
const useRelatedPosts = ( countryCode ) => {
	const { fetchedPosts, postsResolved } = useSelect( ( select ) => {
		const selectorArgs = [
			'postType',
			'post',
			{
				per_page: -1,
				exclude: select( 'core/editor' ).getCurrentPostId(),
				search: countries[ countryCode ],
				fields: [ 'id', 'title', 'excerpt', 'link' ],
			},
		];

		return {
			fetchedPosts: select( 'core' ).getEntityRecords( ...selectorArgs ),
			postsResolved: select( 'core' ).hasFinishedResolution(
				'getEntityRecords',
				selectorArgs
			),
		};
	} );

	return { fetchedPosts, postsResolved };
};

export default useRelatedPosts;
