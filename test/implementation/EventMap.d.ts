export interface CreateEventArguments {
  firstArgument: string;
}

export interface UpdateEventArguments {
  update: boolean;
}

export interface EventStore {
  create: CreateEventArguments;
  update: UpdateEventArguments;
}
