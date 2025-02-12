import { paper } from 'paper'

export const getAllSegments = (groups) => {
    // console.log({group})
    let segments = [];


    groups.forEach(group => {
        group.children?.forEach(child => {
            if (child instanceof paper.Path) {
                segments = segments.concat(child.segments); // Collect all segments
            }
        });
    })

    return segments;
}
