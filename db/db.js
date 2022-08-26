const Ticket = require("../models/Ticket")

class MyDB {
    constructor() {
        this.tickets = []
    }


    /**
     * create and save a new ticket
     * @param {string} username 
     * @param {number} price 
     */
    create(username, price) {

        const ticket = new Ticket(username, price)
        this.ticket.push(ticket)
        return ticket

    }

    /**
     * create multiple ticket for a single user
     * @param {string} username 
     * @param {number} price 
     * @param {number} quantity 
     */
    bulkCreate(username, price, quantity) {
        const result = []
        for (i = 0; i < quantity; i++) {
            const ticket = this.create(username, price)
            result.push(ticket)
        }
        return result
    }

    /**
     * return all available tickets
     */
    find() {
        return this.tickets
    }

    /**
     * find ticket by ticket id
     * @param {string} ticketId 
     */
    findById(ticketId) {
        const ticket = this.tickets.find(

            /**
             * 
             * @param {Ticket} ticket 
             */

            (ticket) => {
                ticket.id === ticketId
            }
        )
        return ticket
    }


    /**
     * find all tickets for a given user
     * @param {string} username 
     */
    findByUserName(username) {
        const tickets = this.tickets.filter(

            /**
             * 
             * @param {Ticket} ticket 
             */

            (ticket) => {
                ticket.username === username
            }
        )
        return tickets
    }


    /**
     * 
     * @param {string} ticketId 
     * @param {{ username: string, price: number }} ticketBody 
     */
    updateById(ticketId, ticketBody) {
        const ticket = this.findById(ticketId)
        ticket.username = ticketBody.username ?? ticket.username
        ticket.price = ticketBody.price ?? ticket.price
        ticket.updatedAt = new Date()


        return ticket
    }


    /**
     * 
     * @param {string} ticketId 
     */
    deleteById(ticketId) {
        const index = this.tickets.findIndex(
            ticket => ticket.id === ticketId
        )

        if (index !== -1) {
            this.tickets.splice(index, 1)
            return true
        } else {
            return false
        }
    }


    draw(winnerCount) {
		const winnerIndices = new Array(winnerCount);
		let index = 0;
		while (index < winnerCount) {
			let winnerIndex = Math.floor(Math.random() * this.tickets.length);
			if (!winnerIndices.includes(winnerIndex)) {
				winnerIndices[index++] = winnerIndex;
				continue;
			}
		}

		const winners = winnerIndices.map((index) => this.tickets[index]);
		return winners;
	}
}


const myDB = new MyDB()

module.exports = myDB