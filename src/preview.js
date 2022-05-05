/**
 * WordPress dependencies
 */
/**
 * External dependencies
 */
import DOMPurify from 'dompurify';
import { __, _n, sprintf } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';

/**
 * Internal dependencies
 */
import countries from '../assets/countries.json';
import continentNames from '../assets/continent-names.json';
import continents from '../assets/continents.json';
import { getEmojiFlag } from './utils';

export default function Preview( { countryCode, relatedPosts } ) {
	if ( ! countryCode ) return null;

	const emojiFlag = getEmojiFlag( countryCode );
	const hasRelatedPosts = relatedPosts?.length > 0;
	const countryName = countries[ countryCode ];
	const continentName = continentNames[ continents[ countryCode ] ];

	return (
		<section className="xwp-country-card">
			<header
				className="xwp-country-card__media"
				data-emoji-flag={ emojiFlag }
			>
				<figure className="xwp-country-card-flag">{ emojiFlag }</figure>
			</header>
			<h3 className="xwp-country-card__heading">
				{ createInterpolateElement(
					sprintf(
						/* translators: %1$s: Country Name, %2$s: Country Code, %3$s: Continent Name */
						__(
							'Hello from <strong>%1$s</strong> (<span>%2$s</span>), %3$s',
							'xwp-country-card'
						),
						countryName,
						countryCode,
						continentName
					),
					{
						strong: <strong />,
						span: (
							<abbr
								className="xwp-country-card__country-code"
								title={ countries[ countryCode ] }
							/>
						),
					}
				) }
			</h3>
			<div className="xwp-country-card__related-posts">
				<h3 className="xwp-country-card__related-posts__heading">
					{ hasRelatedPosts
						? sprintf(
								/* translators: %d: number of related posts */
								_n(
									'There is %d related post:',
									'There are %d related posts:',
									relatedPosts.length,
									'xwp-country-card'
								),
								relatedPosts.length
						  )
						: __(
								'There are no related posts.',
								'xwp-country-card'
						  ) }
				</h3>
				{ hasRelatedPosts && (
					<ul className="xwp-country-card__related-posts-list">
						{ relatedPosts.map( ( relatedPost, index ) => (
							<li
								key={ index }
								className="xwp-country-card__related-post"
							>
								<a
									className="xwp-country-card__link"
									href={ relatedPost.link }
									data-post-id={ relatedPost.id }
								>
									<h3
										className="xwp-country-card__title"
										dangerouslySetInnerHTML={ {
											__html: DOMPurify.sanitize(
												relatedPost.title
											),
										} }
									/>

									<summary
										className="xwp-country-card__excerpt"
										dangerouslySetInnerHTML={ {
											__html: DOMPurify.sanitize(
												relatedPost.excerpt
											),
										} }
									/>
								</a>
							</li>
						) ) }
					</ul>
				) }
			</div>
		</section>
	);
}
