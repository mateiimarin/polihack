export const usePageElements = () => useState('pageElements', () => [
    [{
        label: 'Heading',
        icon: 'fi fi-br-heading',
        content: `<h1 style="font-size: 22px; font-weight: 700">Heading</h1>`
    },
    {
        label: 'Paragraph',
        icon: 'fi fi-br-paragraph',
        content: `<p style="color: #212121">This is a paragraph</p>`
    }],
    [{
        label: 'Image',
        icon: 'fi fi-br-picture',
        content: `<img src="&var&" />`,
    },
    {
        label: 'List',
        icon: 'fi fi-br-list',
        content: `
        <ul style="list-style: inside; padding: 0px 24px;">
            <li>List Item 1</li>
            <li>List Item 2</li>
            <li>List Item 3</li>
        </ul>
        `,
    },
    {
        label: 'Table',
        icon: 'fi fi-br-table-layout',
        content: `
        <table>
            <tr>
                <th>Header 1</th>
                <th>Header 2</th>
                <th>Header 3</th>
            </tr>
            <tr>
                <td>Cell 1</td>
                <td>Cell 2</td>
                <td>Cell 3</td>
            </tr>
            <tr>
                <td>Cell 4</td>
                <td>Cell 5</td>
                <td>Cell 6</td>
            </tr>
        </table>`
    }
    ],
    [{
        label: 'Code',
        icon: 'fi fi-br-square-code',
        content: `
            <div class="code"></div>
        `
    },
    {
        label: 'Math',
        icon: 'fi fi-br-square-root',
        content: `
        <div style="flex justify-center"><div class="math" contenteditable="false">f(x)^2  = \\sqrt{y}</div></div>
    `
    }]
]);