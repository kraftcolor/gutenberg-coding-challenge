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
 * @param {number} postId      Post ID to find related posts of.
 *
 * @return {Object} Object with posts related to the country code.
 */
const useRelatedPosts = ( countryCode, postId ) => {
	const { fetchedPosts, postsResolved } = useSelect( ( select ) => {
		const selectorArgs = [
			'postType',
			'post',
			{
				exclude: postId,
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
