import { fireEvent, render,screen } from "@testing-library/react";
import App from "./App";
import EmojiList from "./emojiList.json";


describe ("Emoji Test" , () => {
    let header,emoji,input,filterList;

    beforeEach ( () => {
        render(<App/>);
});

    test ("Header render test", () => {
        header = screen.getByText(/Emoji Search/i);
        expect(header).toBeInTheDocument();
        
    });


    test ("Emoji List check", () => {
        emoji = EmojiList.slice(0,19);
        emoji.map((item) => {
            expect(screen.getByText(item.title)).toBeInTheDocument();
        });
    })

    test("Emoji filter test", () => {
        input = screen.getByRole("textbox");
        const filter = "smile cat";

        //filterList = EmojiList.filter(test => test.keywords.toLowerCase().match(filter) || test.title.toLowerCase().match(filter));
        filterList =EmojiList.filter(test => test.keywords.match(filter) || test.title.match(filter));
        fireEvent.change (input,{target:{value:filter}});
        expect(screen.getAllByText(/cat/i)).toHaveLength(2);
    })

    test ("Copy test", async () => {
        const click = screen.getByText("100");

        expect(click.parentElement.getAttribute("data-clipboard-text").length).toBeGreaterThan(0);

        //console.log(click.parentElement.getAttribute("data-clipboard-tex"));

        expect(click.parentElement.getAttribute("data-clipboard-text")).toMatch("💯");
    } )

})

