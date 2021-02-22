/* утилита для включения блоков от и до */
export default function getBlockList(firstId, lastId) {
    const blocks = [];
    let isIncluding = false;
    document.querySelectorAll('[id^="rec"]').forEach(page => {
        if (page.id == firstId) {
            isIncluding = true;
        } else if (page.id == lastId) {
            isIncluding = false;
            blocks.push(page);
        }
        if (isIncluding) {
            blocks.push(page);
        }
    });
    return blocks;
}