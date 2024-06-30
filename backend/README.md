## Routes

<details>
  <summary>Error</summary>
  <ul>
    <li>statusCode: number</li>
    <li>error: string</li>
    <li>message: string</li>
  </ul>
</details>

<details>
  <summary><b>POST /auth/login</b></summary>
  <h3>Body</h3>
  <ul>
    <li>name: string</li>
    <li>password: string</li>
  </ul>
  <h3>Response</h3>
  <h4>201</h4>
  <ul>
    <li>user:</li>
    <ul>
      <li>id: string</li>
      <li>imgUrl: string</li>
      <li>name: string</li>
    </ul>
    <li>token: string</li>
  </ul>
</details>

<details>
  <summary><b>GET /auth/login/steam</b></summary>
  <h3>Response</h3>
  <h4>200</h4>
  <ul>
    <li>user:</li>
    <ul>
      <li>id: string</li>
      <li>imgUrl: string</li>
      <li>name: string</li>
    </ul>
    <li>token: string</li>
  </ul>
</details>

<details>
  <summary><b>GET /auth/login/steam</b></summary>
  <h3>Response</h3>
  <h4>200</h4>
  <ul>
    <li>user:</li>
    <ul>
      <li>id: string</li>
      <li>imgUrl: string</li>
      <li>name: string</li>
    </ul>
    <li>token: string</li>
  </ul>
</details>

<details>
  <summary><b>POST /user</b></summary>
  <h3>Body</h3>
  <ul>
    <li>name: string</li>
    <li>displayName: string</li>
    <li>email: string</li>
    <li>password: string</li>
    <li>confirmPassword: string</li>
  </ul>
  <h3>Response</h3>
  <h4>201</h4>
  <ul>
    <li>user:</li>
    <ul>
      <li>id: string</li>
      <li>imgUrl: string</li>
      <li>name: string</li>
    </ul>
    <li>token: string</li>
  </ul>
</details>

<details>
  <summary><b>GET /user</b></summary>
  <h3>Headers</h3>
  <ul>
    <li>authorization: string</li>
  </ul>
  <h3>Response</h3>
  <h4>200</h4>
  <ul>
    <li>id: string</li>
    <li>imgUrl: string</li>
    <li>name: string</li>
    <li>displayName: string</li>
    <li>email: string</li>
    <li>createdAt: Date</li>
    <li>updatedAt: Date</li>
  </ul>
</details>

<details>
  <summary><b>GET /users/:userId</b></summary>
  <h3>Headers</h3>
  <ul>
    <li>authorization: string</li>
  </ul>
  <h3>Response</h3>
  <h4>200</h4>
  <ul>
    <li>user:</li>
    <ul>
      <li>id: string</li>
      <li>imgUrl: string</li>
      <li>name: string</li>
    </ul>
    <li>token: string</li>
  </ul>
</details>

<details>
  <summary><b>GET /users/:userId/platforms</b></summary>
  <h3>Headers</h3>
  <ul>
    <li>authorization: string</li>
  </ul>
  <h3>Response</h3>
  <h4>200</h4>
  <ul>
    <li>id: string</li>
    <li>imgUrl: string</li>
    <li>name: string</li>
    <li>createdAt: Date</li>
    <li>updatedAt: Date</li>
    <li>games: Game[]</li>
    <ul>
      <li>id: string</li>
      <li>imgUrl: string</li>
      <li>name: string</li>
      <li>createdAt: Date</li>
      <li>updatedAt: Date</li>
    </ul>
  </ul>
</details>

<details>
  <summary><b>GET /users/:userId/games</b></summary>
  <h3>Headers</h3>
  <ul>
    <li>authorization: string</li>
  </ul>
  <h3>Response</h3>
  <h4>200</h4>
  <ul>
    <li>id: string</li>
    <li>imgUrl: string</li>
    <li>name: string</li>
    <li>createdAt: Date</li>
    <li>updatedAt: Date</li>
    <li>platforms: Platform[]</li>
    <ul>
      <li>id: string</li>
      <li>imgUrl: string</li>
      <li>name: string</li>
      <li>createdAt: Date</li>
      <li>updatedAt: Date</li>
    </ul>
    <li>teams: Team[]</li>
    <ul>
      <li>id: string</li>
      <li>name: string</li>
      <li>description: string | null</li>
      <li>isOpen: boolean</li>
      <li>isPublic: boolean</li>
      <li>tags: string[]</li>
      <li>createdAt: Date</li>
      <li>updatedAt: Date</li>
    </ul>
  </ul>
</details>

<details>
  <summary><b>GET /users/:userId/teams</b></summary>
  <h3>Headers</h3>
  <ul>
    <li>authorization: string</li>
  </ul>
  <h3>Response</h3>
  <h4>200</h4>
  <ul>
    <li>id: string</li>
    <li>name: string</li>
    <li>description: string | null</li>
    <li>isOpen: boolean</li>
    <li>isPublic: boolean</li>
    <li>tags: string[]</li>
    <li>createdAt: Date</li>
    <li>updatedAt: Date</li>
    <li>members: Member[]</li>
    <ul>
      <li>id: string</li>
      <li>imgUrl: string</li>
      <li>name: string</li>
      <li>isModerator: boolean</li>
    </ul>
  </ul>
</details>
