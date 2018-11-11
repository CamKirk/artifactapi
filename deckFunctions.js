const CArtifactDeckEncoder = {

    currentVersion: 2,
    encodedPrefix: "ADC",
    maxBytesForVarUint32: 5,
    headerSize: 3,
    encodeDeck: function (deckContents) {
        if (!deckContents) throw Error("no deck contents passed");

        let bytes = this.encodeBytes(deckContents);
        if (!bytes) return false;
        let deckCode = this.encodeBytesToString(bytes);
        return deckCode;
    },
    encodeBytes: function (deckContents) {
        //need the set check here
        if (!this.isSet(deckContents) || !this.isSet(deckContents.heroes) || !this.isSet(deckContents.cards)) {
            return false;
        }


        deckContents.heroes.sort(this.sortByCardId);
        deckContents.cards.sort(this.sortByCardId);

        let countHeroes = deckContents.heroes;
        let allCards = countHeroes.concat(deckContents.cards);

        let bytes = [];
        let version = this.currentVersion << 4 | this.extractNBitsWithCarry(countHeroes, 3);
        if (!this.addByte(bytes, version)) return false;

        let dummyChecksum = 0;
        let checkSumByte = bytes.length;
        if (!this.addByte(bytes, dummyChecksum)) return false;

        nameLen = 0;
        let name = "";
        if (this.isSet(deckContents.name)) {
            name = deckContents.name.replace(/<(?:.|\n)*?>/gm, '');//may need to init name on this line instead of 36. need again in line 112
            let trimLength = name.length;

            while (trimLength > 63) {
                let amountToTrim = Math.floor((trimLength - 63) / 4);
                amountToTrim = amountToTrim > 1 ? amountToTrim : 1;
                name = name.substring(0, name.length - amountToTrim);
                trimLength = name.length;
            }
            nameLen = name.length;
        }

        if (!this.addByte(bytes, nameLen)) return false;
        if (!this.addRemainingNumberToBuffer(countHeroes, 3, bytes)) return false;

        checkSum = 0;
        prevCardId = 0;

        for (let currHero = 0; currHero < countHeroes; currHero++) {
            let card = allCards[currHero]
            if (card.turn == 0) return false;

            if (!this.AddCardToBuffer(card.turn, card.id - prevCardId, bytes, checkSum)) return false;//this checkSum should be unChecksum?
            prevCardId = card.id;
        }

        let preStringByteCount = bytes.length;

        let nameBytes = Buffer.from(name).values();
        nameBytes.forEach((nameByte) => {
            if (!this.addByte(bytes, nameByte)) return false;
        });

        let unFullChecksum = this.computeChecksum(bytes, preStringByteCount - this.headerSize);
        let unSmallChecksum = (unFullChecksum & 0x0FF);

        bytes[checkSumByte] = unSmallChecksum;
        return bytes;


    },
    encodeBytesToString: function (bytes) {
        let byteCount = bytes.length;

        if (byteCount == 0) return false;

    },
    addByte: function (bytes, byte) {
        if (byte > 255) return false;

        bytes.push(byte);
        return true;
    },
    sortByCardId: function (a, b) {
        return a.id - b.id;
    },
    isSet: function () {
        //  discuss at: http://locutus.io/php/isset/
        // original by: Kevin van Zonneveld (http://kvz.io)
        // improved by: FremyCompany
        // improved by: Onno Marsman (https://twitter.com/onnomarsman)
        // improved by: Rafał Kukawski (http://blog.kukawski.pl)

        var a = arguments;
        var l = a.length;
        var i = 0;
        var undef;

        if (l === 0) {
            throw new Error('Empty isset');
        };

        while (i !== l) {
            if (a[i] === undef || a[i] === null) {
                return false;
            };
            i++;
        }

        return true;
    }

};
