const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Player
{
    constructor()

    {
        this.velocity =
        {
            x: 0,
            y: 0
        };

        this.rotation = 0;

        const image = new Image();
        image.src = './assets/cthulhu.png';
        image.onload = () =>
        {
            const scale = 0.15;

            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.position =
            {
                // start position of the ship
                x: canvas.width / 2 - this.width / 2, // align in the center
                y: canvas.height - this.height - 20 //botom position
            };
        };
    };

    draw()
    {
        c.save() //save the start possition of our space ship
        c.translate
            (
            player.position.x + player.width / 2,
            player.position.y + player.height / 2
            );

        c.rotate(this.rotation)

        c.translate
            (
            -player.position.x - player.width / 2,
            -player.position.y - player.height / 2
            )

        if(this.image)
        {

            c.drawImage
        (
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height,
        );

        c.restore() // after we apply the rotation method, we restore the space ship.

        }
    }

    update()
    {
        if(this.image)
        {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        }
    }
}

class Projectile
{
    constructor({ position, velocity })
    {
        this.position = position
        this.velocity = velocity

        this.radius = 3
    }

    draw()
    {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'red'
        c.fill()
        c.closePath()
    }

    update()
    {
        this.draw()
        this.position.x += this.velocity.x,
        this.position.y += this.velocity.y
    }
}

class Invader
{
    constructor()

    {
        this.velocity =
        {
            x: 0,
            y: 0
        };

        const image = new Image()
        image.src = './assets/invader.png'
        image.onload = () =>
        {
            const scale = 1

            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.position =
            {
                // start position of the ship
                x: canvas.width / 2 - this.width / 2, // align in the center
                y: canvas.height / 2 - 400
            };
        };
    };

    draw()
    {
        {
            c.drawImage
        (
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height,
        )
        }
    }

    update()
    {
        if(this.image)
        {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        }
    }
}

class Grid
{
    constructor()
    {
        this.position =
        {
            x: 0,
            y: 0
        }

        this.velocity =
        {
            x: 0,
        }

        this.invaders = [new Invader()]
    }
    update()
    {}
}

const player = new Player()
const projectiles = []
// const invader = new Invader()
const grids = [new Grid()]

const keys =
{
    a:
    {
        pressed: false
    },
    d:
    {
        pressed: false
    },
     space:
    {
        pressed: false
    },
    w:
    {
        pressed: false
    },
    s:
    {
        pressed: false
    },
}

function animation()
{
    requestAnimationFrame(animation);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height)
//    invader.update()
    player.update()
    projectiles.forEach((projectile, index) =>
        {
            if(projectile.position.y + projectile.radius <= 0)
            {
                setTimeout(() =>
                {
                    projectiles.splice(index, 1)
                }, 0)
            }
            else
            {
                projectile.update()
            }
        })
        grids.forEach((grid) =>
            {
                grid.update()
                grid.invaders.forEach((invader) =>
                {
                    invader.update()
                })
            })

    if
    (
        keys.a.pressed && player.position.x >= 0
    )
    {
        player.velocity.x = -5,
        player.rotation = -0.15
    }
    else if
    (
        keys.d.pressed &&
        player.position.x + player.width <= canvas.width
    )
    {
        player.velocity.x = 5,
        player.rotation = 0.15
    }
    else if(keys.w.pressed &&
         player.position.y >= 0)
    {
        player.velocity.y = -5
    }
    else if
    (
        keys.s.pressed &&
        player.position.y + player.height <= canvas.height - 20
    )
    {
        player.velocity.y = 5
    }
    else
    {
        player.rotation = 0,
        player.velocity.y = 0,
        player.velocity.x = 0
    }
}

animation()

// control the movement of spaceship
// start the movement with the following keys was pressed
addEventListener('keydown', ({ key }) =>
{
    switch (key)
    {
        case 'a':
            keys.a.pressed = true;
            break
        case 'd':
            keys.d.pressed = true;
            break
        case ' ':
            projectiles.push
            (
                new Projectile
                ({
                    position:
                    {
                        x: player.position.x + player.width / 2,
                        y: player.position.y
                    },
                    velocity:
                    {
                        x: 0,
                        y: -5
                    }
                })
            )
                break
        case 'w':
            keys.w.pressed = true;
            break
        case 's':
            keys.s.pressed = true;
            break
    }
});
// stop the movement with the following keys was release
addEventListener('keyup', ({ key }) =>
{
    switch (key)
    {
        case 'a':
            keys.a.pressed = false;
            break
        case 'd':
            keys.d.pressed = false;
            break
         case ' ':
            break
        case 'w':
            keys.w.pressed = false;
            break
        case 's':
            keys.s.pressed = false;
            break
    }
});
