# Interface Segregation Principle (ISP)

The Interface Segregation Principle states that no client should be forced to depend on methods it does not use. In other words, interfaces should be small and specific to the needs of their clients.

## Key Points

- Split large interfaces into smaller, more specific ones.
- Clients should only know about the methods that are relevant to them.
- Promotes decoupling and easier maintenance.

## Example

```csharp
// Bad: Fat interface
public interface IWorker {
    void Work();
    void Eat();
}

// Good: Segregated interfaces
public interface IWorkable {
    void Work();
}

public interface IEatable {
    void Eat();
}
```

## Benefits

- Reduces side effects and unnecessary dependencies.
- Makes code easier to understand and maintain.
- Facilitates better testing and implementation flexibility.

## Related Principles

- Single Responsibility Principle (SRP)
- Dependency Inversion Principle (DIP)
- Open/Closed Principle (OCP)