import markdownit from 'markdown-it';
const md = markdownit();

// @ts-ignore
import mk from '@iktakahiro/markdown-it-katex';
md.use(mk);


function renderMdHtml(source: string) {
    return md.render(source)
}

export {
    md,
    renderMdHtml
};