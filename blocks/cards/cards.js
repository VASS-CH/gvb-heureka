import { createOptimizedPicture } from '../../scripts/aem.js';

function decorateTags(div, isIconCard) {
    if (isIconCard) {
        div.classList.add('icon-card');
        const [pictureP, headline, contentP] = div.children;
        const picture = pictureP?.querySelector('picture');
        const flex = document.createElement('div');
        flex.className = 'icon-header';
        if (picture) flex.append(picture);
        if (headline) flex.append(headline);
        div.append(flex);
        if (contentP) div.append(contentP);
    } else {
        [...div.children].forEach((child) => {
            const regex = /\[([^\]]+)]/;
            const content = child.textContent || '';
            const match = content.match(regex);
            if (match) {
                child.classList.add('card-tag-wrapper');
                const span = document.createElement('span');
                span.textContent = match[1].toString();
                span.classList.add('card-tag');
                child.textContent = '';
                child.appendChild(span);
            }
        });
    }
}

function initCarousel(block, ul) {
    block.classList.add('cards--carousel');

    const wrapper = document.createElement('div');
    wrapper.className = 'cards-carousel-wrap';

    ul.setAttribute('tabindex', '0');

    wrapper.append(ul);
    block.textContent = '';
    block.append(wrapper);

}

export default function decorate(block) {
    const isIconCard = block.classList.contains('icon-cards');
    const section = block.closest('.section');

    const isSectionCarousel = !![...(section?.classList || [])].find((c) => c === 'carousel');
    const isBlockCarousel = block.classList.contains('carousel');
    const isSectionDefault = !![...(section?.classList || [])].find((c) => c === 'default');
    const isBlockDefault = block.classList.contains('default');

    const variant =
        block.dataset.variant ||
        section?.dataset.variant ||
        (isBlockCarousel || isSectionCarousel ? 'carousel'
            : (isBlockDefault || isSectionDefault ? 'default' : 'default'));

    const ul = document.createElement('ul');
    [...block.children].forEach((row) => {
        const li = document.createElement('li');
        while (row.firstElementChild) li.append(row.firstElementChild);
        [...li.children].forEach((div) => {
            if (div.children.length === 1 && div.querySelector('picture')) {
                div.className = 'cards-card-image';
            } else {
                div.className = 'cards-card-body';
                decorateTags(div, isIconCard);
            }
        });
        ul.append(li);
    });

    ul.querySelectorAll('img').forEach((img) => {
        img.closest('picture')
            ?.replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
    });

    if (variant === 'carousel') {
        initCarousel(block, ul);
    } else {
        block.textContent = '';
        block.classList.add('cards--default');
        block.append(ul);
    }
}
