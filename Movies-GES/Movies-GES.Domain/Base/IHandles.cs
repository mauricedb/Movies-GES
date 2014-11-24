namespace Movies_GES.Domain.Base
{
    public interface IHandles<T>
    {
        void Handle(T command);
    }
}