import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';
import {graphql} from 'gatsby';

import {Layout} from '../components/index';
import {classNames, withPrefix, htmlToReact} from '../utils';
import BlogPostCategories from '../components/BlogPostCategories';
import BlogPostAuthor from '../components/BlogPostAuthor';
import BlogPostTags from '../components/BlogPostTags';

// this minimal GraphQL query ensures that when 'gatsby develop' is running,
// any changes to content files are reflected in browser
export const query = graphql`
  query($url: String) {
    sitePage(path: {eq: $url}) {
      id
    }
  }
`;

export default class Post extends React.Component {
    render() {
        let has_image = false;
        let image_pos = _.get(this.props, 'pageContext.frontmatter.image_position', null) || 'top';
        if (_.get(this.props, 'pageContext.frontmatter.image', null)) {
             has_image = true;
        }
        return (
            <Layout {...this.props}>
            <article className="post py-5 py-sm-6 py-md-7">
            	<div className={classNames('post__hero', 'container', {'container--medium': (image_pos === 'top') || (has_image === false)})}>
            		<div className={classNames('mb-4', {'mb-md-5': image_pos !== 'top', 'mb-md-6': image_pos !== 'top', 'grid': image_pos !== 'top', 'items-center': has_image && (image_pos !== 'top')})}>
            			{has_image && (
            			<div className={classNames('post__image', 'mb-3', {'cell-12': image_pos !== 'top', 'cell-lg-7': image_pos !== 'top', 'mb-lg-0': image_pos !== 'top'})}>
            				<img src={withPrefix(_.get(this.props, 'pageContext.frontmatter.image', null))} alt={_.get(this.props, 'pageContext.frontmatter.image_alt', null)} />
            			</div>
            			)}
            			<header className={classNames('post__header', {'cell-12': image_pos !== 'top', 'cell-lg-5': image_pos !== 'top', 'order-lg-first': has_image && (image_pos === 'right')})}>
            				<div className="post__meta mb-2">
            					{_.get(this.props, 'pageContext.frontmatter.categories', null) && (<React.Fragment>
            						<BlogPostCategories {...this.props} categories={_.get(this.props, 'pageContext.frontmatter.categories', null)} container_class={'post__cat'} />
            						<span className="post__meta-sep"> &middot; </span>
            					</React.Fragment>)}
            					<span className="post__date"><time dateTime={moment(_.get(this.props, 'pageContext.frontmatter.date', null)).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(this.props, 'pageContext.frontmatter.date', null)).strftime('%B %d, %Y')}</time></span>
            				</div>
            				<h1 className="post__title mt-0">{_.get(this.props, 'pageContext.frontmatter.title', null)}</h1>
            				{_.get(this.props, 'pageContext.frontmatter.subtitle', null) && (
            					<p className="post__subtitle">{_.get(this.props, 'pageContext.frontmatter.subtitle', null)}</p>
            				)}
            				{_.get(this.props, 'pageContext.frontmatter.author', null) && (
            					<BlogPostAuthor {...this.props} author={_.get(this.props, 'pageContext.frontmatter.author', null)} container_class={'post__byline'} avatar_size={'medium'} />
            				)}
            			</header>
            		</div>
            	</div>
            	<div className="container container--medium">
            		<div className="post__body text-block">
            			{htmlToReact(_.get(this.props, 'pageContext.html', null))}
            		</div>
            		{_.get(this.props, 'pageContext.frontmatter.tags', null) && (
            		<footer className="post__footer mt-4 mt-md-5">
            			<BlogPostTags {...this.props} tags={_.get(this.props, 'pageContext.frontmatter.tags', null)} />
            		</footer>
            		)}
            	</div>
            </article>
            </Layout>

            <div id="disqus_thread"></div>
<script>
    /**
    *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
    *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */
    /*
    var disqus_config = function () {
    this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
    */
    (function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = 'https://wone-1.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
    })();
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>

        );
    }
}
